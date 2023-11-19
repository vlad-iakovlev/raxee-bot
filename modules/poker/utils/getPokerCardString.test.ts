import { getPokerCardString } from './getPokerCardString.js'

describe('#getPokerCardString', () => {
  it('should return the string representation of a card', () => {
    const str = getPokerCardString(13)

    expect(str).toBe('♦️5')
  })
})
