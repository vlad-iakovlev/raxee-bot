import { getPokerCardSuit } from './getPokerCardSuit.ts'

describe('#getPokerCardSuit', () => {
  it('should return the suit of a card', () => {
    const suit = getPokerCardSuit(13)

    expect(suit).toBe(1)
  })
})
