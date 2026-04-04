import { Subset } from '@vlad-iakovlev/poker'
import { getPokerCardString } from './getPokerCardString.js'

export const getPokerSubsetString = (subset: Subset): string =>
  subset.cards.map(getPokerCardString).join(' ')
