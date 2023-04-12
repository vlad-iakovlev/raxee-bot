import { getMention } from './getMention.js'

describe('#getMention', () => {
  it('should accept undefined', () => {
    const mention = getMention(undefined)

    expect(mention.value).toBe('tg://user?id\\=undefined')
  })

  it('should return simple mention when username is presented', () => {
    const mention = getMention({
      id: 'user-id',
      tgUserId: 12345,
      firstName: 'bar',
      lastName: null,
      username: 'foo',
    })

    expect(mention.value).toBe('@foo')
  })

  it('should return simple mention with escaped username', () => {
    const mention = getMention({
      id: 'user-id',
      tgUserId: 12345,
      firstName: 'bar',
      lastName: null,
      username: 'foo_foo',
    })

    expect(mention.value).toBe('@foo\\_foo')
  })

  it('should return link mention with first and last name when no username presented', () => {
    const mention = getMention({
      id: 'user-id',
      tgUserId: 12345,
      firstName: 'bar',
      lastName: 'baz',
      username: null,
    })

    expect(mention.value).toBe('[bar baz](tg://user?id\\=12345)')
  })

  it('should return link mention with first name when no username and last name presented', () => {
    const mention = getMention({
      id: 'user-id',
      tgUserId: 12345,
      firstName: 'bar',
      lastName: null,
      username: null,
    })

    expect(mention.value).toBe('[bar](tg://user?id\\=12345)')
  })
})
