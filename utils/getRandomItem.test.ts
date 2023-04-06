import { getRandomItem } from './getRandomItem'

describe('#getRandomItem', () => {
  beforeEach(() => {
    jest.spyOn(global.Math, 'random').mockReturnValue(0.3)
  })

  afterEach(() => {
    jest.spyOn(global.Math, 'random').mockRestore()
  })

  it('should return value', () => {
    const item = getRandomItem(['a', 'b', 'c', 'd'])

    expect(item).toBe('b')
  })

  it('should return firstItem when only one is presented', () => {
    const item = getRandomItem(['a'])

    expect(item).toBe('a')
  })
})
