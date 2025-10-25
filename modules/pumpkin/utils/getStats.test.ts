import { PumpkinPlayer } from '@prisma/client'
import * as fns from 'date-fns'
import { describe, expect, test } from 'vitest'
import { prisma } from '../../../utils/prisma.mock.js'
import { getStats } from './getStats.js'

describe('#getStats', () => {
  test('should call prisma.pumpkinPlayer.findMany, prisma.pumpkinStats.groupBy and return stats', async () => {
    const tgChatId = '123'
    prisma.pumpkinPlayer.findMany.mockResolvedValueOnce([
      { id: 'player-1-mock' },
      { id: 'player-2-mock' },
      { id: 'player-3-mock' },
    ] as PumpkinPlayer[])
    // @ts-expect-error Complex Prisma types
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

  test('should call prisma.pumpkinPlayer.findMany, prisma.pumpkinStats.groupBy and return stats filtered by year', async () => {
    const tgChatId = '123'
    prisma.pumpkinPlayer.findMany.mockResolvedValueOnce([
      { id: 'player-1-mock' },
      { id: 'player-2-mock' },
      { id: 'player-3-mock' },
    ] as PumpkinPlayer[])
    // @ts-expect-error Complex Prisma types
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
          gte: fns.startOfYear(new Date('2023')),
          lte: fns.endOfYear(new Date('2023')),
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
