import { getPokerCardSuit } from './getPokerCardSuit.ts'

export const isPokerCardSuitEqual = (card1: number, card2: number): boolean => {
  return getPokerCardSuit(card1) === getPokerCardSuit(card2)
}
