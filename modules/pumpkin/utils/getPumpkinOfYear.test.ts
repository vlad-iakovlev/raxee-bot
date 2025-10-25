import { md } from '@vlad-yakovlev/telegram-md'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import '../../../utils/prisma.mock.js'
import { PumpkinPlayerWithStats } from '../types.js'
import { getPumpkinOfYear } from './getPumpkinOfYear.js'
import { getStats } from './getStats.js'

vi.mock(import('./getStats.js'))
const getStatsMocked = vi.mocked(getStats)
beforeEach(() => getStatsMocked.mockReset())

describe('#getPumpkinOfYear', () => {
  test('should return a message with winners of year', async () => {
    const tgChatId = '123'
    const year = 2023
    const playersWithStats = [
      {
        user: {
          id: 'user-1-id',
          tgUserId: '1',
          firstName: 'John',
          lastName: 'Doe',
          username: 'john_doe',
        },
        winnings: 2,
      },
      {
        user: {
          id: 'user-2-id',
          tgUserId: '2',
          firstName: 'Jane',
          lastName: 'Roe',
          username: 'jane_roe',
        },
        winnings: 2,
      },
      {
        user: {
          id: 'user-3-id',
          tgUserId: '3',
          firstName: 'Mary',
          lastName: 'Lou',
          username: 'mary_lou',
        },
        winnings: 1,
      },
    ] as PumpkinPlayerWithStats[]
    getStatsMocked.mockResolvedValueOnce(playersWithStats)

    const message = await getPumpkinOfYear(tgChatId, year)

    expect(getStatsMocked).toHaveBeenCalledWith(tgChatId, year)
    expect(message).toStrictEqual(
      md.bold('Pumpkin of 2023 \u2014 @john_doe, @jane_roe'),
    )
  })

  test('should return IDK if no winners', async () => {
    const tgChatId = '123'
    const year = 2023
    const playersWithStats = [
      {
        user: {
          id: 'user-1-id',
          tgUserId: '1',
          firstName: 'John',
          lastName: 'Doe',
          username: 'john_doe',
        },
        winnings: 0,
      },
      {
        user: {
          id: 'user-2-id',
          tgUserId: '2',
          firstName: 'Jane',
          lastName: 'Roe',
          username: 'jane_roe',
        },
        winnings: 0,
      },
      {
        user: {
          id: 'user-3-id',
          tgUserId: '3',
          firstName: 'Mary',
          lastName: 'Lou',
          username: 'mary_lou',
        },
        winnings: 0,
      },
    ] as PumpkinPlayerWithStats[]
    getStatsMocked.mockResolvedValueOnce(playersWithStats)

    const message = await getPumpkinOfYear(tgChatId, year)

    expect(getStatsMocked).toHaveBeenCalledWith(tgChatId, year)
    expect(message).toStrictEqual(md.bold('Pumpkin of 2023 \u2014 IDK'))
  })
})
