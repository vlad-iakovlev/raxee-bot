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
        return (
          PokerCombination.getRoyalFlush(subset) ||
          PokerCombination.getStraightFlush(subset) ||
          PokerCombination.getFourOfKind(subset) ||
          PokerCombination.getFullHouse(subset) ||
          PokerCombination.getFlush(subset) ||
          PokerCombination.getStraight(subset) ||
          PokerCombination.getThreeOfKind(subset) ||
          PokerCombination.getTwoPair(subset) ||
          PokerCombination.getPair(subset) ||
          PokerCombination.getHighCard(subset)
        )
      }),
      R.sort((a, b) => a.weight - b.weight),
      R.last()
    )
  }

  static getRoyalFlush(subset?: PokerSubset): PokerCombination | undefined {
    return PokerCombination.build(
      POKER_COMBINATION_LEVEL.ROYAL_FLUSH,
      PokerSubset.getRoyalFlush(subset)
    )
  }

  static getStraightFlush(subset?: PokerSubset): PokerCombination | undefined {
    return PokerCombination.build(
      POKER_COMBINATION_LEVEL.STRAIGHT_FLUSH,
      PokerSubset.getStraightFlush(subset)
    )
  }

  static getFourOfKind(subset?: PokerSubset): PokerCombination | undefined {
    return PokerCombination.build(
      POKER_COMBINATION_LEVEL.FOUR_OF_KIND,
      PokerSubset.getFourOfKind(subset)
    )
  }

  static getFullHouse(subset?: PokerSubset): PokerCombination | undefined {
    return PokerCombination.build(
      POKER_COMBINATION_LEVEL.FULL_HOUSE,
      PokerSubset.getFullHouse(subset)
    )
  }

  static getFlush(subset?: PokerSubset): PokerCombination | undefined {
    return PokerCombination.build(
      POKER_COMBINATION_LEVEL.FLUSH,
      PokerSubset.getFlush(subset)
    )
  }

  static getStraight(subset?: PokerSubset): PokerCombination | undefined {
    return PokerCombination.build(
      POKER_COMBINATION_LEVEL.STRAIGHT,
      PokerSubset.getStraight(subset)
    )
  }

  static getThreeOfKind(subset?: PokerSubset): PokerCombination | undefined {
    return PokerCombination.build(
      POKER_COMBINATION_LEVEL.THREE_OF_KIND,
      PokerSubset.getThreeOfKind(subset)
    )
  }

  static getTwoPair(subset?: PokerSubset): PokerCombination | undefined {
    return PokerCombination.build(
      POKER_COMBINATION_LEVEL.TWO_PAIR,
      PokerSubset.getTwoPair(subset)
    )
  }

  static getPair(subset?: PokerSubset): PokerCombination | undefined {
    return PokerCombination.build(
      POKER_COMBINATION_LEVEL.PAIR,
      PokerSubset.getPair(subset)
    )
  }

  static getHighCard(subset: PokerSubset): PokerCombination

  static getHighCard(subset?: PokerSubset): PokerCombination | undefined

  static getHighCard(subset?: PokerSubset): PokerCombination | undefined {
    return PokerCombination.build(POKER_COMBINATION_LEVEL.HIGH_CARD, subset)
  }

  static build(
    level: POKER_COMBINATION_LEVEL,
    subset: PokerSubset
  ): PokerCombination

  static build(
    level: POKER_COMBINATION_LEVEL,
    subset?: PokerSubset
  ): PokerCombination | undefined

  static build(
    level: POKER_COMBINATION_LEVEL,
    subset?: PokerSubset
  ): PokerCombination | undefined {
    if (subset) {
      return new PokerCombination(level, subset)
    }
  }
}
