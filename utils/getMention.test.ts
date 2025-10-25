import { describe, expect, test } from 'vitest'
import { getMention } from './getMention.js'

describe('#getMention', () => {
  test('should return simple mention when username is presented', () => {
    const mention = getMention({
      id: 'user-id',
      createdAt: new Date(0),
      updatedAt: new Date(0),
      tgUserId: '12345',
      firstName: 'bar',
      lastName: null,
      username: 'foo',
    })

    expect(mention.value).toBe('@foo')
  })

  test('should return simple mention with escaped username', () => {
    const mention = getMention({
      id: 'user-id',
      createdAt: new Date(0),
      updatedAt: new Date(0),
      tgUserId: '12345',
      firstName: 'bar',
      lastName: null,
      username: 'foo_foo',
    })

    expect(mention.value).toBe('@foo\\_foo')
  })

  test('should return link mention with first and last name when no username presented', () => {
    const mention = getMention({
      id: 'user-id',
      createdAt: new Date(0),
      updatedAt: new Date(0),
      tgUserId: '12345',
      firstName: 'bar',
      lastName: 'baz',
      username: null,
    })

    expect(mention.value).toBe('[bar baz](tg://user?id\\=12345)')
  })

  test('should return link mention with first name when no username and last name presented', () => {
    const mention = getMention({
      id: 'user-id',
      createdAt: new Date(0),
      updatedAt: new Date(0),
      tgUserId: '12345',
      firstName: 'bar',
      lastName: null,
      username: null,
    })

    expect(mention.value).toBe('[bar](tg://user?id\\=12345)')
  })
})
