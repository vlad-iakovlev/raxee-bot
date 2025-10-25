import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { getRandomItem } from './getRandomItem.js'

describe('#getRandomItem', () => {
  beforeEach(() => {
    vi.spyOn(global.Math, 'random').mockReturnValue(0.3)
  })

  afterEach(() => {
    vi.spyOn(global.Math, 'random').mockRestore()
  })

  test('should return value', () => {
    const item = getRandomItem(['a', 'b', 'c', 'd'])

    expect(item).toBe('b')
  })

  test('should return firstItem when only one is presented', () => {
    const item = getRandomItem(['a'])

    expect(item).toBe('a')
  })
})
