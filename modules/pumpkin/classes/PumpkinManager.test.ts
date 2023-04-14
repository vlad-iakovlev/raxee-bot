import * as fns from 'date-fns'
import { PumpkinManager } from './PumpkinManager.js'

jest.mock('../../../utils/prisma.js', () => ({
  prisma: {
    pumpkinPlayer: {
      create: jest.fn(),
      findMany: jest.fn(),
      findFirst: jest.fn(),
    },
    pumpkinStats: {
      create: jest.fn(),
      findMany: jest.fn(),
      groupBy: jest.fn(),
    },
  },
}))
const { prisma } = jest.requireMock('../../../utils/prisma.js')

describe('PumpkinManager', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('#findWinner', () => {
    it('should call prisma.pumpkinStats.findMany and return first player', async () => {
      const tgChatId = 123
      const date = new Date()
      prisma.pumpkinStats.findMany.mockResolvedValueOnce([
        { player: 'player-1-mock' },
        { player: 'player-2-mock' },
      ])

      const winner = await PumpkinManager.findWinner(tgChatId, date)

      expect(prisma.pumpkinStats.findMany).toBeCalledWith({
        where: {
          date: {
            gte: fns.startOfDay(date),
            lte: fns.endOfDay(date),
          },
          player: {
            tgChatId,
          },
        },
        orderBy: {
          date: 'desc',
        },
        take: 1,
        include: {
          player: {
            include: {
              user: true,
            },
          },
        },
      })
      expect(winner).toBe('player-1-mock')
    })

    it('should call prisma.pumpkinStats.findMany and return null if no stats found', async () => {
      const tgChatId = 123
      const date = new Date()
      prisma.pumpkinStats.findMany.mockResolvedValueOnce([])

      const winner = await PumpkinManager.findWinner(tgChatId, date)

      expect(prisma.pumpkinStats.findMany).toBeCalledWith({
        where: {
          date: {
            gte: fns.startOfDay(date),
            lte: fns.endOfDay(date),
          },
          player: {
            tgChatId,
          },
        },
        orderBy: {
          date: 'desc',
        },
        take: 1,
        include: {
          player: {
            include: {
              user: true,
            },
          },
        },
      })
      expect(winner).toBe(null)
    })
  })

  describe('#createWinner', () => {
    it('should call prisma.pumpkinStats.create', async () => {
      const playerId = 'player-mock'
      const date = new Date()

      await PumpkinManager.createWinner(playerId, date)

      expect(prisma.pumpkinStats.create).toBeCalledWith({
        data: {
          date,
          player: {
            connect: {
              id: playerId,
            },
          },
        },
      })
    })
  })

  describe('#findPlayers', () => {
    it('should call prisma.pumpkinPlayer.findMany and return players', async () => {
      const tgChatId = 123
      prisma.pumpkinPlayer.findMany.mockResolvedValueOnce([
        'player-1-mock',
        'player-2-mock',
      ])

      const players = await PumpkinManager.findPlayers(tgChatId)

      expect(prisma.pumpkinPlayer.findMany).toBeCalledWith({
        where: {
          tgChatId,
        },
        include: {
          user: true,
        },
      })
      expect(players).toEqual(['player-1-mock', 'player-2-mock'])
    })
  })

  describe('#findOrCreatePlayer', () => {
    it('should call prisma.pumpkinPlayer.findFirst and return player', async () => {
      const tgChatId = 123
      const tgUserId = 456
      prisma.pumpkinPlayer.findFirst.mockResolvedValueOnce('player-mock')

      const player = await PumpkinManager.findOrCreatePlayer(tgChatId, tgUserId)

      expect(prisma.pumpkinPlayer.findFirst).toBeCalledWith({
        where: {
          tgChatId,
          user: {
            tgUserId,
          },
        },
        include: {
          user: true,
        },
      })
      expect(player).toBe('player-mock')
    })

    it('should call prisma.pumpkinPlayer.create and return player', async () => {
      const tgChatId = 123
      const tgUserId = 456
      prisma.pumpkinPlayer.findFirst.mockResolvedValueOnce(null)
      prisma.pumpkinPlayer.create.mockResolvedValueOnce('player-mock')

      const player = await PumpkinManager.findOrCreatePlayer(tgChatId, tgUserId)

      expect(prisma.pumpkinPlayer.findFirst).toBeCalledWith({
        where: {
          tgChatId,
          user: {
            tgUserId,
          },
        },
        include: {
          user: true,
        },
      })
      expect(prisma.pumpkinPlayer.create).toBeCalledWith({
        data: {
          tgChatId,
          user: {
            connect: {
              tgUserId,
            },
          },
        },
        include: {
          user: true,
        },
      })
      expect(player).toBe('player-mock')
    })
  })

  describe('#getStats', () => {
    it('should call prisma.pumpkinPlayer.findMany, prisma.pumpkinStats.groupBy and return stats', async () => {
      const tgChatId = 123
      prisma.pumpkinPlayer.findMany.mockResolvedValueOnce([
        { id: 'player-1-mock' },
        { id: 'player-2-mock' },
        { id: 'player-3-mock' },
      ])
      prisma.pumpkinStats.groupBy.mockResolvedValueOnce([
        { playerId: 'player-1-mock', _count: { id: 1 } },
        { playerId: 'player-2-mock', _count: { id: 2 } },
      ])

      const stats = await PumpkinManager.getStats(tgChatId)

      expect(prisma.pumpkinPlayer.findMany).toBeCalledWith({
        where: {
          tgChatId,
        },
        include: {
          user: true,
        },
      })
      expect(prisma.pumpkinStats.groupBy).toBeCalledWith({
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
      const tgChatId = 123
      prisma.pumpkinPlayer.findMany.mockResolvedValueOnce([
        { id: 'player-1-mock' },
        { id: 'player-2-mock' },
        { id: 'player-3-mock' },
      ])
      prisma.pumpkinStats.groupBy.mockResolvedValueOnce([
        { playerId: 'player-1-mock', _count: { id: 1 } },
        { playerId: 'player-2-mock', _count: { id: 2 } },
      ])

      const stats = await PumpkinManager.getStats(tgChatId, 2023)

      expect(prisma.pumpkinPlayer.findMany).toBeCalledWith({
        where: {
          tgChatId,
        },
        include: {
          user: true,
        },
      })
      expect(prisma.pumpkinStats.groupBy).toBeCalledWith({
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
})
