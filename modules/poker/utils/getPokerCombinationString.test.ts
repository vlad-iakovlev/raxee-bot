import { COMBINATION_LEVEL, Combination, Subset } from '@vlad-yakovlev/poker'
import { getPokerCombinationString } from './getPokerCombinationString.js'

describe('#getPokerCombinationString', () => {
  it('should return combination string', () => {
    const level = COMBINATION_LEVEL.PAIR
    const subset = new Subset([1, 2, 3, 4, 5])

    const combination = new Combination(level, subset)

    expect(getPokerCombinationString(combination)).toBe(
      '♦️2 ♥️2 ♠️2 ♣️3 ♦️3 (Pair)',
    )
  })
})
