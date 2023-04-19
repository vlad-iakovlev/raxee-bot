import { getPokerCardValue } from './getPokerCardValue.ts'

describe('#getPokerCardValue', () => {
  it('should return the value of a card', () => {
    const value = getPokerCardValue(13)

    expect(value).toBe(3)
  })
})
