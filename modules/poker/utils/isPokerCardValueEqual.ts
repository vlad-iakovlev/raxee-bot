import { getPokerCardValue } from './getPokerCardValue.ts'

export const isPokerCardValueEqual = (
  card1: number,
  card2: number
): boolean => {
  return getPokerCardValue(card1) === getPokerCardValue(card2)
}
