import * as R from 'remeda'
import { PokerCard } from './PokerCard'
import { POKER_CARD_VALUE } from '../types'

export class PokerSubset {
  cards: [number, number, number, number, number]

  constructor(cards: PokerSubset['cards']) {
    this.cards = cards
  }

  getString() {
    return this.cards.map(PokerCard.getString).join(' ')
  }

  static getRoyalFlush(subset?: PokerSubset): PokerSubset | undefined {
    if (
      subset &&
      PokerCard.getValue(subset.cards[0]) === POKER_CARD_VALUE.ACE
    ) {
      return PokerSubset.getStraightFlush(subset)
    }
  }

  static getStraightFlush(subset?: PokerSubset): PokerSubset | undefined {
    return PokerSubset.getStraight(PokerSubset.getFlush(subset))
  }

  static getFourOfKind(subset?: PokerSubset): PokerSubset | undefined {
    if (!subset) return

    for (let i = 0; i < subset.cards.length - 3; i += 1) {
      for (let j = i + 1; j < subset.cards.length - 2; j += 1) {
        for (let k = j + 1; k < subset.cards.length - 1; k += 1) {
          for (let l = k + 1; l < subset.cards.length; l += 1) {
            if (
              PokerCard.isValueEqual(subset.cards[i], subset.cards[j]) &&
              PokerCard.isValueEqual(subset.cards[i], subset.cards[k]) &&
              PokerCard.isValueEqual(subset.cards[i], subset.cards[l])
            ) {
              PokerSubset.reorder(subset, [i, j, k, l])
            }
          }
        }
      }
    }
  }

  static getFullHouse(subset?: PokerSubset): PokerSubset | undefined {
    if (!subset) return

    if (
      PokerCard.isValueEqual(subset.cards[0], subset.cards[1]) &&
      PokerCard.isValueEqual(subset.cards[0], subset.cards[2]) &&
      PokerCard.isValueEqual(subset.cards[3], subset.cards[4])
    ) {
      return subset
    }

    if (
      PokerCard.isValueEqual(subset.cards[2], subset.cards[3]) &&
      PokerCard.isValueEqual(subset.cards[2], subset.cards[4]) &&
      PokerCard.isValueEqual(subset.cards[0], subset.cards[1])
    ) {
      return PokerSubset.reorder(subset, [2, 3, 4])
    }
  }

  static getFlush(subset?: PokerSubset): PokerSubset | undefined {
    if (
      subset?.cards.every((card) =>
        PokerCard.isSuitEqual(card, subset.cards[0])
      )
    ) {
      return subset
    }
  }

  static getStraight(subset?: PokerSubset): PokerSubset | undefined {
    if (!subset) return

    if (
      PokerCard.getValue(subset.cards[0]) === POKER_CARD_VALUE.ACE &&
      PokerCard.getValue(subset.cards[1]) === POKER_CARD_VALUE.FIVE &&
      PokerCard.getValue(subset.cards[2]) === POKER_CARD_VALUE.FOUR &&
      PokerCard.getValue(subset.cards[3]) === POKER_CARD_VALUE.THREE &&
      PokerCard.getValue(subset.cards[4]) === POKER_CARD_VALUE.TWO
    ) {
      return PokerSubset.reorder(subset, [1, 2, 3, 4])
    }

    if (
      PokerCard.isValueEqual(subset.cards[1], subset.cards[0] - 4) &&
      PokerCard.isValueEqual(subset.cards[2], subset.cards[0] - 8) &&
      PokerCard.isValueEqual(subset.cards[3], subset.cards[0] - 12) &&
      PokerCard.isValueEqual(subset.cards[4], subset.cards[0] - 16)
    ) {
      return subset
    }
  }

  static getThreeOfKind(subset?: PokerSubset): PokerSubset | undefined {
    if (!subset) return

    for (let i = 0; i < subset.cards.length - 2; i += 1) {
      for (let j = i + 1; j < subset.cards.length - 1; j += 1) {
        for (let k = j + 1; k < subset.cards.length; k += 1) {
          if (
            PokerCard.isValueEqual(subset.cards[i], subset.cards[j]) &&
            PokerCard.isValueEqual(subset.cards[i], subset.cards[k])
          ) {
            return PokerSubset.reorder(subset, [i, j, k])
          }
        }
      }
    }
  }

  static getTwoPair(subset?: PokerSubset): PokerSubset | undefined {
    if (!subset) return

    for (let i = 0; i < subset.cards.length - 3; i += 1) {
      for (let j = i + 1; j < subset.cards.length - 2; j += 1) {
        for (let k = j + 1; k < subset.cards.length - 1; k += 1) {
          for (let l = k + 1; l < subset.cards.length; l += 1) {
            if (
              PokerCard.isValueEqual(subset.cards[i], subset.cards[j]) &&
              PokerCard.isValueEqual(subset.cards[k], subset.cards[l])
            ) {
              return PokerSubset.reorder(subset, [i, j, k, l])
            }
          }
        }
      }
    }
  }

  static getPair(subset?: PokerSubset): PokerSubset | undefined {
    if (!subset) return

    for (let i = 0; i < subset.cards.length - 1; i += 1) {
      for (let j = i + 1; j < subset.cards.length; j += 1) {
        if (PokerCard.isValueEqual(subset.cards[i], subset.cards[j])) {
          return PokerSubset.reorder(subset, [i, j])
        }
      }
    }
  }

  static getSubsets(cards: number[]): PokerSubset[] {
    const subsets: PokerSubset[] = []

    for (let i = 0; i < cards.length - 4; i += 1) {
      for (let j = i + 1; j < cards.length - 3; j += 1) {
        for (let k = j + 1; k < cards.length - 2; k += 1) {
          for (let l = k + 1; l < cards.length - 1; l += 1) {
            for (let m = l + 1; m < cards.length; m += 1) {
              subsets.push(
                new PokerSubset([
                  cards[i],
                  cards[j],
                  cards[k],
                  cards[l],
                  cards[m],
                ])
              )
            }
          }
        }
      }
    }

    return subsets
  }

  static reorder(subset: PokerSubset, priorityIndexes: number[]): PokerSubset {
    const newSubset = new PokerSubset(
      [] as unknown as [number, number, number, number, number]
    )
    const otherIndexes = new Set(R.range(0, subset.cards.length))

    priorityIndexes.forEach((index) => {
      newSubset.cards.push(subset.cards[index])
      otherIndexes.delete(index)
    })

    otherIndexes.forEach((index) => {
      newSubset.cards.push(subset.cards[index])
    })

    return newSubset
  }
}
