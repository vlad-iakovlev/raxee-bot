import { POKER_CARD_SUIT_NAMES, POKER_CARD_VALUE_NAMES } from '../constants.js'
import { getPokerCardSuit } from './getPokerCardSuit.js'
import { getPokerCardValue } from './getPokerCardValue.js'

export const getPokerCardString = (card: number): string => {
  const suit = getPokerCardSuit(card)
  const value = getPokerCardValue(card)
  return `${POKER_CARD_SUIT_NAMES[suit]}${POKER_CARD_VALUE_NAMES[value]}`
}
