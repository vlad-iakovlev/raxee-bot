import { POKER_ROUND, PokerPlayer, User } from '@prisma/client'
import * as R from 'remeda'
import { Markdown, md } from 'telegram-md'
import { MESSAGES, STRINGS } from '../constants.js'
import { PokerCard } from './PokerCard.js'
import { PokerCombination } from './PokerCombination.js'
import { PokerStateManager } from './PokerStateManager.js'

export class PokerPlayerManager {
  id: string
  cards: number[]
  balance: number
  betAmount: number
  hasFolded: boolean
  hasLost: boolean
  hasTurned: boolean
  user: User
  pokerState: PokerStateManager

  constructor(
    pokerState: PokerStateManager,
    playerData: PokerPlayer & { user: User }
  ) {
    this.id = playerData.id
    this.cards = playerData.cards
    this.balance = playerData.balance
    this.betAmount = playerData.betAmount
    this.hasFolded = playerData.hasFolded
    this.hasLost = playerData.hasLost
    this.hasTurned = playerData.hasTurned
    this.user = playerData.user
    this.pokerState = pokerState
  }

  get callAmount(): number {
    return this.pokerState.requiredBetAmount - this.betAmount
  }

  get canFold(): boolean {
    return !this.pokerState.isAllIn || this.balance > 0
  }

  get canCheck(): boolean {
    return this.callAmount === 0
  }

  get canCall(): boolean {
    return this.callAmount > 0 && this.callAmount < this.balance
  }

  get canAllIn(): boolean {
    return !this.pokerState.isAllIn || (!this.canCheck && !this.canCall)
  }

  get canRaise(): boolean {
    return !this.pokerState.isAllIn
  }

  get bestCombination(): PokerCombination | undefined {
    if (this.hasLost || this.hasFolded) return
    return PokerCombination.getBest([...this.pokerState.cards, ...this.cards])
  }

  get isWinner(): boolean {
    return (
      !!this.bestCombination &&
      this.bestCombination.weight === this.pokerState.bestCombinationWeight
    )
  }

  get keyboardCards(): string[] | undefined {
    switch (this.pokerState.round) {
      case POKER_ROUND.PREFLOP:
        return [STRINGS.preflop]

      case POKER_ROUND.FLOP:
        return this.pokerState.cards
          .map(PokerCard.getString)
          .map((card, index) => (index < 3 ? card : ' '))

      case POKER_ROUND.TURN:
        return this.pokerState.cards
          .map(PokerCard.getString)
          .map((card, index) => (index < 4 ? card : ' '))

      case POKER_ROUND.RIVER:
        return this.pokerState.cards.map(PokerCard.getString)
    }
  }

  get keyboardBank(): string[] | undefined {
    return [STRINGS.bank(this.pokerState.bankAmount)]
  }

  get keyboardBalance(): string[] | undefined {
    if (this.hasLost) {
      return undefined
    }

    return [...this.cards.map(PokerCard.getString), `${this.balance} 🪙`]
  }

  get keyboardActions(): string[] | undefined {
    if (this.pokerState.currentPlayer.id !== this.id) {
      return undefined
    }

    return [
      this.canFold && STRINGS.fold,
      this.canCheck && STRINGS.check,
      this.canCall && STRINGS.call(this.callAmount),
      this.canAllIn && STRINGS.allIn,
    ].filter(R.isTruthy)
  }

  get keyboard(): string[][] {
    return [
      this.keyboardCards,
      this.keyboardBank,
      this.keyboardBalance,
      this.keyboardActions,
    ].filter(R.isTruthy)
  }

  increaseBet(amount: number) {
    amount = Math.min(amount, this.balance)
    this.betAmount += amount
    this.balance -= amount
  }

  async sendMessage(message: string | Markdown, withKeyboard = false) {
    await this.pokerState.tgApi.sendMessage(
      this.user.tgUserId,
      md.build(message),
      {
        parse_mode: 'MarkdownV2',
        ...(withKeyboard && { reply_markup: { keyboard: this.keyboard } }),
      }
    )
  }

  async sendStickerAndRemoveKeyboard(sticker: string) {
    await this.pokerState.tgApi.sendSticker(this.user.tgUserId, sticker, {
      reply_markup: { remove_keyboard: true },
    })
  }

  async sendCurrentTurn() {
    await this.sendMessage(
      MESSAGES._.userTurn(this.pokerState.currentPlayer),
      true
    )
  }
}
