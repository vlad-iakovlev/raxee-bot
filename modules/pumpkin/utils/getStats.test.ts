import * as fns from 'date-fns'
import { getStats } from './getStats.js'

jest.mock('../../../utils/prisma.js', () => ({
  prisma: {
    pumpkinPlayer: {
      findMany: jest.fn(),
    },
    pumpkinStats: {
      groupBy: jest.fn(),
    },
  },
}))
const { prisma } = jest.requireMock('../../../utils/prisma.js')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('#getStats', () => {
  it('should call prisma.pumpkinPlayer.findMany, prisma.pumpkinStats.groupBy and return stats', async () => {
    const tgChatId = '123'
    prisma.pumpkinPlayer.findMany.mockResolvedValueOnce([
      { id: 'player-1-mock' },
      { id: 'player-2-mock' },
      { id: 'player-3-mock' },
    ])
    prisma.pumpkinStats.groupBy.mockResolvedValueOnce([
      { playerId: 'player-1-mock', _count: { id: 1 } },
      { playerId: 'player-2-mock', _count: { id: 2 } },
    ])

    const stats = await getStats(tgChatId)

    expect(prisma.pumpkinPlayer.findMany).toHaveBeenCalledWith({
      where: {
        tgChatId,
      },
      include: {
        user: true,
      },
    })
    expect(prisma.pumpkinStats.groupBy).toHaveBeenCalledWith({
      by: ['playerId'],
      where: {
        player: {
          tgChatId,
        },
      },
      _count: {
        id: true,
      },
    })
    expect(stats).toEqual([
      { id: 'player-1-mock', winnings: 1 },
      { id: 'player-2-mock', winnings: 2 },
      { id: 'player-3-mock', winnings: 0 },
    ])
  })

  it('should call prisma.pumpkinPlayer.findMany, prisma.pumpkinStats.groupBy and return stats filtered by year', async () => {
    const tgChatId = '123'
    prisma.pumpkinPlayer.findMany.mockResolvedValueOnce([
      { id: 'player-1-mock' },
      { id: 'player-2-mock' },
      { id: 'player-3-mock' },
    ])
    prisma.pumpkinStats.groupBy.mockResolvedValueOnce([
      { playerId: 'player-1-mock', _count: { id: 1 } },
      { playerId: 'player-2-mock', _count: { id: 2 } },
    ])

    const stats = await getStats(tgChatId, 2023)

    expect(prisma.pumpkinPlayer.findMany).toHaveBeenCalledWith({
      where: {
        tgChatId,
      },
      include: {
        user: true,
      },
    })
    expect(prisma.pumpkinStats.groupBy).toHaveBeenCalledWith({
      by: ['playerId'],
      where: {
        player: {
          tgChatId,
        },
        date: {
          gte: fns.startOfYear(new Date(String('2023'))),
          lte: fns.endOfYear(new Date(String('2023'))),
        },
      },
      _count: {
        id: true,
      },
    })
    expect(stats).toEqual([
      { id: 'player-1-mock', winnings: 1 },
      { id: 'player-2-mock', winnings: 2 },
      { id: 'player-3-mock', winnings: 0 },
    ])
  })
})
