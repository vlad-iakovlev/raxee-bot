import { describe, expect, test } from 'vitest'
import { getPokerCardString } from './getPokerCardString.js'

describe('#getPokerCardString', () => {
  test('should return the string representation of a card', () => {
    const str = getPokerCardString(13)

    expect(str).toBe('♦️5')
  })
})
