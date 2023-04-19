import { POKER_CARD_SUIT } from '../types.ts'

export const getPokerCardSuit = (card: number): POKER_CARD_SUIT => {
  return card % 4
}
