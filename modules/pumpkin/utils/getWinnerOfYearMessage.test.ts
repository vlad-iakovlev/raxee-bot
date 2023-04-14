import { md } from 'telegram-md'
import { getMention } from '../../../utils/getMention.js'
import { PumpkinManager } from '../classes/PumpkinManager.js'
import { PumpkinPlayerWithStats } from '../types.js'
import { getWinnerOfYearMessage } from './getWinnerOfYearMessage.js'

const mockGetStats = jest.spyOn(PumpkinManager, 'getStats')

describe('#getWinnerOfYearMessage', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return a message with winners of year', async () => {
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
        winnings: 2,
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
        winnings: 1,
      },
    ] as PumpkinPlayerWithStats[]
    mockGetStats.mockResolvedValueOnce(playersWithStats)

    const message = await getWinnerOfYearMessage(tgChatId, year)

    expect(mockGetStats).toBeCalledWith(tgChatId, year)
    expect(message).toStrictEqual(
      md.bold('Pumpkin of 2023 \u2014 @john_doe, @jane_roe')
    )
  })

  it('should return IDK if no winners', async () => {
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
        winnings: 0,
      },
      {
        user: {
          id: 'user-2-id',
          tgUserId: 2,
          firstName: 'Jane',
          lastName: 'Roe',
          username: 'jane_roe',
        },
        winnings: 0,
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

    const message = await getWinnerOfYearMessage(tgChatId, year)

    expect(mockGetStats).toBeCalledWith(tgChatId, year)
    expect(message).toStrictEqual(md.bold('Pumpkin of 2023 \u2014 IDK'))
  })
})
