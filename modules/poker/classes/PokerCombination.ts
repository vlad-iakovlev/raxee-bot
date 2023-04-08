import * as R from 'remeda'
import { POKER_COMBINATION_LEVEL } from '../types'
import { PokerSubset } from './PokerSubset'
import { PokerCard } from './PokerCard'
import { POKER_COMBINATION_LEVEL_NAMES } from '../constants'

export class PokerCombination {
  level: POKER_COMBINATION_LEVEL
  subset: PokerSubset

  constructor(level: POKER_COMBINATION_LEVEL, subset: PokerSubset) {
    this.level = level
    this.subset = subset
  }

  get weight() {
    return (
      this.level * 1e10 +
      PokerCard.getValue(this.subset.cards[0]) * 1e8 +
      PokerCard.getValue(this.subset.cards[1]) * 1e6 +
      PokerCard.getValue(this.subset.cards[2]) * 1e4 +
      PokerCard.getValue(this.subset.cards[3]) * 1e2 +
      PokerCard.getValue(this.subset.cards[4])
    )
  }

  get levelName() {
    return POKER_COMBINATION_LEVEL_NAMES[this.level]
  }

  getString() {
    return [this.subset.getString(), `(${this.levelName})`].join(' ')
  }

  static getBest(cards: number[]): PokerCombination | undefined {
    return R.pipe(
      cards,
      R.sort((a, b) => b - a),
      PokerSubset.getSubsets,
      R.map((subset) => {
        // prettier-ignore
        return (
          PokerCombination.build(POKER_COMBINATION_LEVEL.ROYAL_FLUSH, subset.royalFlush) ||
          PokerCombination.build(POKER_COMBINATION_LEVEL.STRAIGHT_FLUSH, subset.straightFlush) ||
          PokerCombination.build(POKER_COMBINATION_LEVEL.FOUR_OF_KIND, subset.fourOfKind) ||
          PokerCombination.build(POKER_COMBINATION_LEVEL.FULL_HOUSE, subset.fullHouse) ||
          PokerCombination.build(POKER_COMBINATION_LEVEL.FLUSH, subset.flush) ||
          PokerCombination.build(POKER_COMBINATION_LEVEL.STRAIGHT, subset.straight) ||
          PokerCombination.build(POKER_COMBINATION_LEVEL.THREE_OF_KIND, subset.threeOfKind) ||
          PokerCombination.build(POKER_COMBINATION_LEVEL.TWO_PAIR, subset.twoPair) ||
          PokerCombination.build(POKER_COMBINATION_LEVEL.PAIR, subset.pair) ||
          PokerCombination.build(POKER_COMBINATION_LEVEL.HIGH_CARD, subset)
        )
      }),
      R.sort((a, b) => a.weight - b.weight),
      R.last()
    )
  }

  private static build(
    level: POKER_COMBINATION_LEVEL,
    subset: PokerSubset
  ): PokerCombination

  private static build(
    level: POKER_COMBINATION_LEVEL,
    subset?: PokerSubset
  ): PokerCombination | undefined

  private static build(
    level: POKER_COMBINATION_LEVEL,
    subset?: PokerSubset
  ): PokerCombination | undefined {
    if (subset) {
      return new PokerCombination(level, subset)
    }
  }
}