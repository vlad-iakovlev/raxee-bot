import { getCardSuit, getCardValue } from '@vlad-yakovlev/poker'
import { POKER_CARD_SUIT_NAMES, POKER_CARD_VALUE_NAMES } from '../constants.js'

export const getPokerCardString = (card: number): string => {
  const suit = getCardSuit(card)
  const value = getCardValue(card)
  return `${POKER_CARD_SUIT_NAMES[suit]}${POKER_CARD_VALUE_NAMES[value]}`
}
