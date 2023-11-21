import { Subset } from '@vlad-yakovlev/poker'
import { getPokerCardString } from './getPokerCardString.js'

export const getPokerSubsetString = (subset: Subset): string => {
  return subset.cards.map(getPokerCardString).join(' ')
}
