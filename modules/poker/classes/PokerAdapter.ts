import { User } from '@prisma/client'
import {
  BaseError,
  ERROR_CODE,
  Player,
  ROUND,
  Room,
  RoomData,
  RoomParams,
} from '@vlad-yakovlev/poker'
import { Markdown, md } from '@vlad-yakovlev/telegram-md'
import assert from 'assert'
import { Api } from 'grammy'
import * as R from 'remeda'
import { CallQueue } from '../../../classes/CallQueue.js'
import { getRandomItem } from '../../../utils/getRandomItem.js'
import { prisma } from '../../../utils/prisma.js'
import {
  MESSAGES,
  STARTING_BALANCE,
  STARTING_BASE_BET_AMOUNT,
  STICKERS,
  STRINGS,
} from '../constants.js'
import { getPokerCardString } from '../utils/getPokerCardString.js'
import { PokerStorage } from './PokerStorage.js'

export class PokerAdapter {
  room: Room<undefined, User>
  tgApi: Api
  tgQueue = new CallQueue()

  constructor(room: Room<undefined, User>, tgApi: Api) {
    this.room = room
    this.tgApi = tgApi

    room.on('nextDeal', (data) => {
      this.tgQueue.add(() =>
        this.broadcastMessage({
          message: MESSAGES._.nextDeal(data),
        }),
      )
    })

    room.on('dealEnded', (data) => {
      this.tgQueue.add(() =>
        this.broadcastMessage({
          message: MESSAGES._.dealEnded(data),
        }),
      )
    })

    room.on('nextTurn', (data) => {
      this.tgQueue.add(() =>
        this.broadcastMessage({
          message: MESSAGES._.nextTurn(data),
          withKeyboard: true,
        }),
      )
    })

    room.on('gameEnded', () => {
      this.tgQueue.add(async () => {
        await this.broadcastMessage({
          message: MESSAGES._.gameEnded,
        })

        await Promise.all(
          this.players.map((player) =>
            this.tgApi.sendSticker(
              player.payload.tgUserId,
              getRandomItem(STICKERS),
              { reply_markup: { remove_keyboard: true } },
            ),
          ),
        )
      })
    })

    room.on('fold', (data) => {
      this.tgQueue.add(() =>
        this.broadcastPlayerMessage(data.player, STRINGS.fold),
      )
    })

    room.on('check', (data) => {
      this.tgQueue.add(() =>
        this.broadcastPlayerMessage(data.player, STRINGS.check),
      )
    })

    room.on('call', (data) => {
      this.tgQueue.add(() =>
        this.broadcastPlayerMessage(data.player, STRINGS.call),
      )
    })

    room.on('raise', (data) => {
      this.tgQueue.add(() =>
        this.broadcastPlayerMessage(
          data.player,
          STRINGS.raiseAmount(data.amount),
        ),
      )
    })

    room.on('allIn', (data) => {
      this.tgQueue.add(() =>
        this.broadcastPlayerMessage(data.player, STRINGS.allIn),
      )
    })
  }

  static async loadByTgChatIdOrCreate(
    this: void,
    tgChatId: string,
    tgApi: Api,
  ): Promise<PokerAdapter> {
    const roomParams: RoomParams = {
      storage: new PokerStorage(),
      startingBaseBetAmount: STARTING_BASE_BET_AMOUNT,
    }

    // We're using upsert in storage, so we don't need to call `Room.create`
    const room = await Room.load<undefined, User>(tgChatId, roomParams)
    assert(room, 'Room is not loaded')

    return new PokerAdapter(room, tgApi)
  }

  static async loadByTgUserId(
    this: void,
    tgUserId: string,
    tgApi: Api,
  ): Promise<PokerAdapter | undefined> {
    const stateData = await prisma.pokerState.findFirst({
      where: {
        players: {
          some: {
            user: {
              tgUserId,
            },
          },
        },
      },
      include: {
        players: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    })

    if (!stateData) return

    const roomParams: RoomParams<undefined, User> = {
      storage: new PokerStorage(),
      startingBaseBetAmount: STARTING_BASE_BET_AMOUNT,
    }

    const roomData: RoomData<undefined, User> = {
      id: stateData.tgChatId,
      cards: stateData.cards,
      round: stateData.round as ROUND,
      dealsCount: stateData.dealsCount,
      dealerIndex: stateData.dealerIndex,
      currentPlayerIndex: stateData.currentPlayerIndex,
      players: stateData.players.map((player) => ({
        id: player.user.id,
        cards: player.cards,
        balance: player.balance,
        betAmount: player.betAmount,
        hasFolded: player.hasFolded,
        hasLost: player.hasLost,
        hasTurned: player.hasTurned,
        payload: player.user,
      })),
      payload: undefined,
    }

    return new PokerAdapter(
      new Room<undefined, User>(roomParams, roomData),
      tgApi,
    )
  }

  get tgChatId() {
    return this.room.id
  }

  get dealsCount() {
    return this.room.dealsCount
  }

  get players() {
    return this.room.players
  }

  get currentPlayer() {
    return this.room.currentPlayer
  }

  async addPlayer(tgUserId: string) {
    const user = await prisma.user.findFirst({
      where: {
        tgUserId,
      },
    })
    assert(user, 'User is not found')

    await this.room.addPlayer(user.id, STARTING_BALANCE, user)
  }

  async dealCards() {
    await this.room.dealCards()
  }

  async endGame() {
    await this.room.endGame()
  }

  async handleMessage(
    sender: Player<User>,
    message: string,
  ): Promise<string | undefined> {
    try {
      switch (message) {
        case STRINGS.fold:
          await this.room.fold(sender.id)
          break

        case STRINGS.check:
          await this.room.check(sender.id)
          break

        case STRINGS.callAmount(sender.callAmount):
          await this.room.call(sender.id)
          break

        case STRINGS.allIn:
          await this.room.allIn(sender.id)
          break

        default:
          {
            const betAmount = Number(message)

            if (!betAmount) {
              this.tgQueue.add(() =>
                this.broadcastPlayerMessage(sender, message),
              )
              return MESSAGES.onMessage.unknownCommand
            }

            await this.room.raise(sender.id, betAmount)
          }
          break
      }
    } catch (error) {
      if (error instanceof BaseError) {
        if (error.code === ERROR_CODE.WRONG_TURN) {
          this.tgQueue.add(() => this.broadcastPlayerMessage(sender, message))
        }

        return MESSAGES.onMessage.errors[error.code]
      } else {
        throw error
      }
    }
  }

  async broadcastPlayerMessage(sender: Player<User>, message: string) {
    await this.broadcastMessage({
      message: MESSAGES._.playerMessage(sender, message),
      players: this.room.players.filter((player) => player.id !== sender.id),
    })
  }

  async broadcastMessage({
    message,
    players = this.room.players,
    withKeyboard,
  }: {
    message: string | Markdown
    players?: Player<User>[]
    withKeyboard?: boolean
  }) {
    await Promise.all(
      players.map((player) =>
        this.tgApi.sendMessage(player.payload.tgUserId, md.build(message), {
          parse_mode: 'MarkdownV2',
          ...(withKeyboard && {
            reply_markup: { keyboard: this.getKeyboard(player) },
          }),
        }),
      ),
    )
  }

  getKeyboard(player: Player<User>): string[][] {
    const keyboard: string[][] = []

    switch (this.room.round) {
      case ROUND.PREFLOP:
        keyboard.push([STRINGS.preflop])
        break

      case ROUND.FLOP:
        keyboard.push(
          this.room.cards
            .map(getPokerCardString)
            .map((card, index) => (index < 3 ? card : ' ')),
        )
        break

      case ROUND.TURN:
        keyboard.push(
          this.room.cards
            .map(getPokerCardString)
            .map((card, index) => (index < 4 ? card : ' ')),
        )
        break

      case ROUND.RIVER:
        keyboard.push(this.room.cards.map(getPokerCardString))
        break
    }

    keyboard.push([STRINGS.potAmount(this.room.potAmount)])

    if (!player.hasLost) {
      keyboard.push([
        ...player.cards.map(getPokerCardString),
        `${player.balance} 🪙`,
      ])
    }

    if (this.room.currentPlayer.id === player.id) {
      keyboard.push(
        [
          player.canFold && STRINGS.fold,
          player.canCheck && STRINGS.check,
          player.canCall && STRINGS.callAmount(player.callAmount),
          player.canAllIn && STRINGS.allIn,
        ].filter(R.isTruthy),
      )
    }

    return keyboard
  }
}
