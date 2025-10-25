import { Subset } from '@vlad-yakovlev/poker'
import { describe, expect, test } from 'vitest'
import { getPokerSubsetString } from './getPokerSubsetString.js'

describe('#getPokerSubsetString', () => {
  test('should return the string representation of a subset', () => {
    const subset = new Subset([1, 2, 3, 4, 5])

    expect(getPokerSubsetString(subset)).toBe('♦️2 ♥️2 ♠️2 ♣️3 ♦️3')
  })
})
