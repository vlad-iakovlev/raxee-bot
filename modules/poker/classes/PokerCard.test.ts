import { PokerCard } from './PokerCard.js'

describe('PokerCard', () => {
  describe('#getSuit', () => {
    it('should return the suit of a card', () => {
      const suit = PokerCard.getSuit(13)

      expect(suit).toBe(1)
    })
  })

  describe('#getValue', () => {
    it('should return the value of a card', () => {
      const value = PokerCard.getValue(13)

      expect(value).toBe(3)
    })
  })

  describe('#isSuitEqual', () => {
    it('should return true if the suits of two cards are equal', () => {
      const isEqual = PokerCard.isSuitEqual(13, 17)

      expect(isEqual).toBe(true)
    })

    it('should return false if the suits of two cards are not equal', () => {
      const isEqual = PokerCard.isSuitEqual(13, 15)

      expect(isEqual).toBe(false)
    })
  })

  describe('#isValueEqual', () => {
    it('should return true if the values of two cards are equal', () => {
      const isEqual = PokerCard.isValueEqual(13, 15)

      expect(isEqual).toBe(true)
    })

    it('should return false if the values of two cards are not equal', () => {
      const isEqual = PokerCard.isValueEqual(13, 17)

      expect(isEqual).toBe(false)
    })
  })

  describe('#getString', () => {
    it('should return the string representation of a card', () => {
      const str = PokerCard.getString(13)

      expect(str).toBe('♦️5')
    })
  })
})
