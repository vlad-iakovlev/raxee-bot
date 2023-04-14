import { getIsDec31 } from './getIsDec31.js'

describe('#getIsDec31', () => {
  it('should return true if date is Dec 31', () => {
    const date = new Date(2020, 11, 31)

    const result = getIsDec31(date)

    expect(result).toBe(true)
  })

  it('should return false if date is not Dec 31', () => {
    const date = new Date(2020, 11, 30)

    const result = getIsDec31(date)

    expect(result).toBe(false)
  })
})
