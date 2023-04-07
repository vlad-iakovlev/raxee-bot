import * as R from 'remeda'
import { PokerPlayer, User, PokerState, POKER_ROUND } from '@prisma/client'
import { prisma } from '../../../utils/prisma'
import { PokerPlayerManager } from './PokerPlayerManger'
import { shuffle } from '../../../utils/shuffle'
import {
  BASE_BET,
  DEFAULT_BALANCE,
  MESSAGES,
  STICKERS,
  STRINGS,
} from '../constants'
import { Markdown } from 'telegram-md'
import { getRandomItem } from '../../../utils/getRandomItem'
import { Api } from 'grammy'

export class PokerStateManager {
  id: string
  tgChatId: number
  cards: number[]
  round: POKER_ROUND
  dealsCount: number
  dealerIndex: number
  smallIndex: number
  bigIndex: number
  currentPlayerIndex: number
  players: PokerPlayerManager[]
  tgApi: Api

  constructor(
    stateData: PokerState & { players: Array<PokerPlayer & { user: User }> },
    tgApi: Api
  ) {
    this.id = stateData.id
    this.tgChatId = stateData.tgChatId
    this.cards = stateData.cards
    this.round = stateData.round
    this.dealsCount = stateData.dealsCount
    this.dealerIndex = stateData.dealerIndex
    this.smallIndex = 0
    this.bigIndex = 0
    this.currentPlayerIndex = stateData.currentPlayerIndex
    this.players = stateData.players.map(
      (playerData) => new PokerPlayerManager(this, playerData)
    )
    this.tgApi = tgApi
  }

  static async loadByTgChatIdOrCreate(
    tgChatId: number,
    tgApi: Api
  ): Promise<PokerStateManager> {
    const stateData = await prisma.pokerState.upsert({
      where: {
        tgChatId,
      },
      create: {
        tgChatId,
        cards: [],
        round: POKER_ROUND.PRE_FLOP,
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
    tgUserId: number,
    tgApi: Api
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

  get bankAmount(): number {
    return this.players.reduce((acc, player) => acc + player.betAmount, 0)
  }

  get minBetAmount(): number {
    return (Math.floor(this.dealsCount / 4) + 1) * BASE_BET
  }

  get topBetAmount(): number {
    return Math.max(...this.players.map((player) => player.betAmount))
  }

  get isAllIn(): boolean {
    return this.players.some(
      (player) => !player.hasLost && player.balance === 0
    )
  }

  get dealer(): PokerPlayerManager {
    return this.players[this.dealerIndex]
  }

  get small(): PokerPlayerManager {
    return this.players[this.smallIndex]
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

  get everyoneHasTurned(): boolean {
    return this.players.every(
      (player) =>
        player.hasLost ||
        player.hasFolded ||
        player.balance === 0 ||
        (player.hasTurned && player.betAmount === this.topBetAmount)
    )
  }

  get bestCombinationWeight(): number {
    return Math.max(
      ...this.players.map((player) => player.bestCombination?.weight || 0)
    )
  }

  async addPlayer(tgUserId: number) {
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
        pokerState: {
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
    this.round = POKER_ROUND.PRE_FLOP
    this.cards = deck.splice(0, 5)
    this.players.forEach((player) => {
      player.betAmount = 0
      player.cards = deck.splice(0, 2)
      player.hasFolded = false
      player.hasTurned = false
    })

    this.dealerIndex = this.getNextPlayerIndex(this.dealerIndex)
    this.smallIndex = this.getNextPlayerIndex(this.dealerIndex)
    this.bigIndex = this.getNextPlayerIndex(this.smallIndex)
    this.currentPlayerIndex = this.getNextPlayerIndex(this.bigIndex)

    this.big.increaseBet(this.minBetAmount)
    this.small.increaseBet(this.minBetAmount / 2)

    await this.save()

    await this.broadcastMessage(
      MESSAGES._.dealStarted({
        players: this.playersInDeal,
        dealer: this.dealer,
        small: this.small,
        big: this.big,
      })
    )
    await this.broadcastCurrentTurn()
  }

  async endGame() {
    await this.broadcastMessage(MESSAGES._.gameEnded)

    await Promise.all(
      this.players.map((player) =>
        player.sendStickerAndRemoveKeyboard(getRandomItem(STICKERS))
      )
    )

    await prisma.pokerState.delete({
      where: {
        id: this.id,
      },
    })
  }

  async handleMessage(
    sender: PokerPlayerManager,
    message: string
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

    this.currentPlayer.increaseBet(sender.callAmount)
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

    if (betAmount < sender.callAmount + this.minBetAmount) {
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

    if (this.everyoneHasTurned) {
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
      })
    )

    const winnersCount = this.players.reduce(
      (acc, player) => (player.isWinner ? acc + 1 : acc),
      0
    )
    const winAmount = this.bankAmount / winnersCount

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
      case POKER_ROUND.PRE_FLOP:
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
      this.players.filter((player) => player.id !== sender.id)
    )
  }

  async broadcastCurrentTurn() {
    await Promise.all(this.players.map((player) => player.sendCurrentTurn()))
  }
}
