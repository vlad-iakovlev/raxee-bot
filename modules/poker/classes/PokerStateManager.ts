import { POKER_ROUND, PokerPlayer, PokerState, User } from '@prisma/client'
import { Markdown } from '@vlad-yakovlev/telegram-md'
import { Api } from 'grammy'
import * as R from 'remeda'
import { getRandomItem } from '../../../utils/getRandomItem.js'
import { prisma } from '../../../utils/prisma.js'
import { shuffle } from '../../../utils/shuffle.js'
import {
  BASE_BET,
  DEFAULT_BALANCE,
  MESSAGES,
  STICKERS,
  STRINGS,
} from '../constants.js'
import { PokerPlayerManager } from './PokerPlayerManger.js'

export class PokerStateManager {
  id: string
  tgChatId: string
  cards: number[]
  round: POKER_ROUND
  dealsCount: number
  dealerIndex: number
  currentPlayerIndex: number
  players: PokerPlayerManager[]
  tgApi: Api

  constructor(
    stateData: PokerState & { players: (PokerPlayer & { user: User })[] },
    tgApi: Api,
  ) {
    this.id = stateData.id
    this.tgChatId = stateData.tgChatId
    this.cards = stateData.cards
    this.round = stateData.round
    this.dealsCount = stateData.dealsCount
    this.dealerIndex = stateData.dealerIndex
    this.currentPlayerIndex = stateData.currentPlayerIndex
    this.players = stateData.players.map(
      (playerData) => new PokerPlayerManager(this, playerData),
    )
    this.tgApi = tgApi
  }

  static async loadByTgChatIdOrCreate(
    this: void,
    tgChatId: string,
    tgApi: Api,
  ): Promise<PokerStateManager> {
    const stateData = await prisma.pokerState.upsert({
      where: {
        tgChatId,
      },
      create: {
        tgChatId,
        cards: [],
        round: POKER_ROUND.PREFLOP,
        dealsCount: 0,
        dealerIndex: 0,
        currentPlayerIndex: 0,
      },
      update: {},
      include: {
        players: {
          include: {
            user: true,
          },
        },
      },
    })

    return new PokerStateManager(stateData, tgApi)
  }

  static async loadByTgUserId(
    this: void,
    tgUserId: string,
    tgApi: Api,
  ): Promise<PokerStateManager | undefined> {
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
        },
      },
    })

    return stateData ? new PokerStateManager(stateData, tgApi) : undefined
  }

  async save() {
    await prisma.pokerState.update({
      where: {
        id: this.id,
      },
      data: {
        cards: this.cards,
        round: this.round,
        dealsCount: this.dealsCount,
        dealerIndex: this.dealerIndex,
        currentPlayerIndex: this.currentPlayerIndex,
        players: {
          update: this.players.map((player) => ({
            where: {
              id: player.id,
            },
            data: {
              cards: player.cards,
              balance: player.balance,
              betAmount: player.betAmount,
              hasFolded: player.hasFolded,
              hasLost: player.hasLost,
              hasTurned: player.hasTurned,
            },
          })),
        },
      },
    })
  }

  get potAmount(): number {
    return this.players.reduce((acc, player) => acc + player.betAmount, 0)
  }

  get baseBetAmount(): number {
    return (Math.floor(this.dealsCount / 4) + 1) * BASE_BET
  }

  get requiredBetAmount(): number {
    return Math.max(...this.players.map((player) => player.betAmount))
  }

  get isAllIn(): boolean {
    return this.players.some(
      (player) => !player.hasLost && player.balance === 0,
    )
  }

  get dealer(): PokerPlayerManager {
    return this.players[this.dealerIndex]
  }

  get smallIndex(): number {
    return this.getNextPlayerIndex(this.dealerIndex)
  }

  get small(): PokerPlayerManager {
    return this.players[this.smallIndex]
  }

  get bigIndex(): number {
    return this.getNextPlayerIndex(this.smallIndex)
  }

  get big(): PokerPlayerManager {
    return this.players[this.bigIndex]
  }

  get currentPlayer(): PokerPlayerManager {
    return this.players[this.currentPlayerIndex]
  }

  get playersInDeal(): PokerPlayerManager[] {
    return this.players.filter((player) => !player.hasLost && !player.hasFolded)
  }

  get isOnlyOnePlayerLeft(): boolean {
    return this.playersInDeal.length === 1
  }

  get isAllPlayersTurned(): boolean {
    return this.players.every(
      (player) =>
        player.hasLost ||
        player.hasFolded ||
        player.balance === 0 ||
        (player.hasTurned && player.betAmount === this.requiredBetAmount),
    )
  }

  get bestCombinationWeight(): number {
    return Math.max(
      ...this.players.map((player) => player.bestCombinationWeight),
    )
  }

  async addPlayer(tgUserId: string) {
    const playerData = await prisma.pokerPlayer.create({
      data: {
        cards: [],
        balance: DEFAULT_BALANCE,
        betAmount: 0,
        hasFolded: false,
        hasLost: false,
        hasTurned: false,
        user: {
          connect: {
            tgUserId,
          },
        },
        state: {
          connect: {
            id: this.id,
          },
        },
      },
      include: {
        user: true,
      },
    })

    this.players.push(new PokerPlayerManager(this, playerData))
  }

  async dealCards() {
    const deck = shuffle(R.range(0, 52))
    this.dealsCount++
    this.round = POKER_ROUND.PREFLOP
    this.cards = deck.splice(0, 5)
    this.players.forEach((player) => {
      player.betAmount = 0
      player.cards = deck.splice(0, 2)
      player.hasFolded = false
      player.hasTurned = false
    })

    this.dealerIndex = this.getNextPlayerIndex(this.dealerIndex)
    this.currentPlayerIndex = this.getNextPlayerIndex(this.bigIndex)

    this.small.increaseBet(this.baseBetAmount / 2)
    this.big.increaseBet(this.baseBetAmount)

    await this.save()

    await this.broadcastMessage(
      MESSAGES._.dealStarted({
        players: this.playersInDeal,
        dealer: this.dealer,
        small: this.small,
        big: this.big,
      }),
    )
    await this.broadcastCurrentTurn()
  }

  async endGame() {
    await this.broadcastMessage(MESSAGES._.gameEnded)

    await Promise.all(
      this.players.map((player) =>
        player.sendStickerAndRemoveKeyboard(getRandomItem(STICKERS)),
      ),
    )

    await prisma.pokerState.delete({
      where: {
        id: this.id,
      },
    })
  }

  async handleMessage(
    sender: PokerPlayerManager,
    message: string,
  ): Promise<string | undefined> {
    switch (message) {
      case STRINGS.fold:
        return this.handleFoldMessage(sender, message)
      case STRINGS.check:
        return this.handleCheckMessage(sender, message)
      case STRINGS.call(sender.callAmount):
        return this.handleCallMessage(sender, message)
      case STRINGS.allIn:
        return this.handleAllInMessage(sender, message)
      default:
        return this.handleOtherMessage(sender, message)
    }
  }

  async handleFoldMessage(sender: PokerPlayerManager, message: string) {
    if (!sender.canFold) {
      return MESSAGES.onMessage.foldNotAllowed
    }

    sender.hasFolded = true
    await this.broadcastPlayerMessage(sender, message)
    await this.nextTurn()
  }

  async handleCheckMessage(sender: PokerPlayerManager, message: string) {
    if (!sender.canCheck) {
      return MESSAGES.onMessage.checkNotAllowed
    }

    await this.broadcastPlayerMessage(sender, message)
    await this.nextTurn()
  }

  async handleCallMessage(sender: PokerPlayerManager, message: string) {
    if (!sender.canCall) {
      return MESSAGES.onMessage.callNotAllowed
    }

    sender.increaseBet(sender.callAmount)
    await this.broadcastPlayerMessage(sender, message)
    await this.nextTurn()
  }

  async handleAllInMessage(sender: PokerPlayerManager, message: string) {
    if (!sender.canAllIn) {
      return MESSAGES.onMessage.allInNotAllowed
    }

    sender.increaseBet(sender.balance)
    await this.broadcastPlayerMessage(sender, message)
    await this.nextTurn()
  }

  async handleOtherMessage(sender: PokerPlayerManager, message: string) {
    const betAmount = Number(message)

    if (!betAmount) {
      await this.broadcastPlayerMessage(sender, message)
      return MESSAGES.onMessage.unknownCommand
    }

    if (!sender.canRaise) {
      return MESSAGES.onMessage.raiseNotAllowed
    }

    if (betAmount >= sender.balance) {
      return MESSAGES.onMessage.betTooBig
    }

    if (betAmount < sender.callAmount + this.baseBetAmount) {
      return MESSAGES.onMessage.betTooSmall
    }

    sender.increaseBet(betAmount)
    await this.broadcastPlayerMessage(sender, message)
    await this.nextTurn()
  }

  async nextTurn() {
    this.currentPlayer.hasTurned = true

    if (this.isOnlyOnePlayerLeft) {
      return this.endDeal()
    }

    if (this.isAllPlayersTurned) {
      if (this.round === POKER_ROUND.RIVER || this.isAllIn) {
        return this.endDeal()
      }

      this.players.forEach((player) => void (player.hasTurned = false))
      this.round = this.getNextRound(this.round)
      this.currentPlayerIndex = this.dealerIndex
    }

    this.currentPlayerIndex = this.getNextPlayerIndex(this.currentPlayerIndex)
    await this.save()
    await this.broadcastCurrentTurn()
  }

  async endDeal() {
    await this.broadcastMessage(
      MESSAGES._.dealEnded({
        tableCards: this.cards,
        players: this.players.filter((player) => !player.hasLost),
      }),
    )

    const winnersCount = this.players.reduce(
      (acc, player) => (player.isWinner ? acc + 1 : acc),
      0,
    )
    const winAmount = this.potAmount / winnersCount

    this.players.forEach((player) => {
      if (player.isWinner) player.balance += winAmount
      if (player.balance === 0) player.hasLost = true
    })

    if (this.players.filter((player) => !player.hasLost).length < 2) {
      await this.endGame()
    } else {
      await this.dealCards()
    }
  }

  getNextPlayerIndex(index: number): number {
    do {
      index += 1
      index %= this.players.length
    } while (this.players[index].hasLost || this.players[index].hasFolded)

    return index
  }

  getNextRound(round: POKER_ROUND): POKER_ROUND {
    switch (round) {
      case POKER_ROUND.PREFLOP:
        return POKER_ROUND.FLOP
      case POKER_ROUND.FLOP:
        return POKER_ROUND.TURN
      default:
        return POKER_ROUND.RIVER
    }
  }

  async broadcastMessage(message: string | Markdown, players = this.players) {
    await Promise.all(players.map((player) => player.sendMessage(message)))
  }

  async broadcastPlayerMessage(sender: PokerPlayerManager, message: string) {
    await this.broadcastMessage(
      MESSAGES._.playerMessage(sender, message),
      this.players.filter((player) => player.id !== sender.id),
    )
  }

  async broadcastCurrentTurn() {
    await Promise.all(this.players.map((player) => player.sendCurrentTurn()))
  }
}
