import { md } from '@vlad-yakovlev/telegram-md'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import '../../../utils/prisma.mock.js'
import { PumpkinPlayerWithStats } from '../types.js'
import { getStats } from './getStats.js'
import { getStatsMessage } from './getStatsMessage.js'

vi.mock(import('./getStats.js'))
const getStatsMocked = vi.mocked(getStats)
beforeEach(() => getStatsMocked.mockReset())

describe('#getStatsMessage', () => {
  test('should return a message with stats', async () => {
    const tgChatId = '123'
    const playersWithStats = [
      {
        user: {
          id: 'user-1-id',
          tgUserId: '1',
          firstName: 'John',
          lastName: 'Doe',
          username: 'john_doe',
        },
        winnings: 1,
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
        winnings: 0,
      },
    ] as PumpkinPlayerWithStats[]
    getStatsMocked.mockResolvedValueOnce(playersWithStats)

    const message = await getStatsMessage(tgChatId)

    expect(getStatsMocked).toHaveBeenCalledWith(tgChatId, undefined)
    expect(message).toStrictEqual(
      md.join(
        [
          'Top pumpkins of all time:',
          '',
          md`${md.bold('1.')} jane_roe \u2014 2 times`,
          md`${md.bold('2.')} john_doe \u2014 1 times`,
          '',
          md.italic('Total participants \u2014 3'),
        ],
        '\n',
      ),
    )
  })

  test('should return a message with stats filtered by year', async () => {
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
        winnings: 1,
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
        winnings: 0,
      },
    ] as PumpkinPlayerWithStats[]
    getStatsMocked.mockResolvedValueOnce(playersWithStats)

    const message = await getStatsMessage(tgChatId, year)

    expect(getStatsMocked).toHaveBeenCalledWith(tgChatId, year)
    expect(message).toStrictEqual(
      md.join(
        [
          'Top pumpkins of this year:',
          '',
          md`${md.bold('1.')} jane_roe \u2014 2 times`,
          md`${md.bold('2.')} john_doe \u2014 1 times`,
          '',
          md.italic('Total participants \u2014 3'),
        ],
        '\n',
      ),
    )
  })
})
