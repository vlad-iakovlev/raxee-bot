import { Combination } from '@vlad-yakovlev/poker'
import { POKER_COMBINATION_LEVEL_NAMES } from '../constants.js'
import { getPokerSubsetString } from './getPokerSubsetString.js'

export const getPokerCombinationString = (combination: Combination): string => {
  return [
    getPokerSubsetString(combination.subset),
    `(${POKER_COMBINATION_LEVEL_NAMES[combination.level]})`,
  ].join(' ')
}
