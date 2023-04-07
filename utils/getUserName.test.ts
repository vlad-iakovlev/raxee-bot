import { getUserName } from './getUserName'

describe('#getUserName', () => {
  it('should accept undefined', () => {
    const userName = getUserName(undefined)

    expect(userName).toBe('')
  })

  it('should return username when presented', () => {
    const userName = getUserName({
      id: 'user-id',
      tgUserId: 12345,
      firstName: 'bar',
      lastName: null,
      username: 'foo',
    })

    expect(userName).toBe('foo')
  })

  it('should return first and last name when no username presented', () => {
    const userName = getUserName({
      id: 'user-id',
      tgUserId: 12345,
      firstName: 'bar',
      lastName: 'baz',
      username: null,
    })

    expect(userName).toBe('bar baz')
  })

  it('should return first name when no username and last name presented', () => {
    const userName = getUserName({
      id: 'user-id',
      tgUserId: 12345,
      firstName: 'bar',
      lastName: null,
      username: null,
    })

    expect(userName).toBe('bar')
  })
})
