import { POKER_CARD_SUIT_NAMES, POKER_CARD_VALUE_NAMES } from '../constants'
import { POKER_CARD_SUIT, POKER_CARD_VALUE } from '../types'

export class PokerCard {
  static getSuit(card: number): POKER_CARD_SUIT {
    return card % 4
  }

  static getValue(card: number): POKER_CARD_VALUE {
    return card >> 2
  }

  static isSuitEqual(card1: number, card2: number): boolean {
    return PokerCard.getSuit(card1) === PokerCard.getSuit(card2)
  }

  static isValueEqual(card1: number, card2: number): boolean {
    return PokerCard.getValue(card1) === PokerCard.getValue(card2)
  }

  static getString(card: number): string {
    const suit = PokerCard.getSuit(card)
    const value = PokerCard.getValue(card)
    return `${POKER_CARD_SUIT_NAMES[suit]}${POKER_CARD_VALUE_NAMES[value]}`
  }
}
