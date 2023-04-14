import { md } from 'telegram-md'
import { PumpkinManager } from '../classes/PumpkinManager.js'
import { PumpkinPlayerWithStats } from '../types.js'
import { getStatsMessage } from './getStatsMessage.js'

const mockGetStats = jest.spyOn(PumpkinManager, 'getStats')

describe('#getStatsMessage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return a message with stats', async () => {
    const tgChatId = 123
    const playersWithStats = [
      {
        user: {
          id: 'user-1-id',
          tgUserId: 1,
          firstName: 'John',
          lastName: 'Doe',
          username: 'john_doe',
        },
        winnings: 1,
      },
      {
        user: {
          id: 'user-2-id',
          tgUserId: 2,
          firstName: 'Jane',
          lastName: 'Roe',
          username: 'jane_roe',
        },
        winnings: 2,
      },
      {
        user: {
          id: 'user-3-id',
          tgUserId: 3,
          firstName: 'Mary',
          lastName: 'Lou',
          username: 'mary_lou',
        },
        winnings: 0,
      },
    ] as PumpkinPlayerWithStats[]
    mockGetStats.mockResolvedValueOnce(playersWithStats)

    const message = await getStatsMessage(tgChatId)

    expect(mockGetStats).toBeCalledWith(tgChatId, undefined)
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
        '\n'
      )
    )
  })

  it('should return a message with stats filtered by year', async () => {
    const tgChatId = 123
    const year = 2023
    const playersWithStats = [
      {
        user: {
          id: 'user-1-id',
          tgUserId: 1,
          firstName: 'John',
          lastName: 'Doe',
          username: 'john_doe',
        },
        winnings: 1,
      },
      {
        user: {
          id: 'user-2-id',
          tgUserId: 2,
          firstName: 'Jane',
          lastName: 'Roe',
          username: 'jane_roe',
        },
        winnings: 2,
      },
      {
        user: {
          id: 'user-3-id',
          tgUserId: 3,
          firstName: 'Mary',
          lastName: 'Lou',
          username: 'mary_lou',
        },
        winnings: 0,
      },
    ] as PumpkinPlayerWithStats[]
    mockGetStats.mockResolvedValueOnce(playersWithStats)

    const message = await getStatsMessage(tgChatId, year)

    expect(mockGetStats).toBeCalledWith(tgChatId, year)
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
        '\n'
      )
    )
  })
})
