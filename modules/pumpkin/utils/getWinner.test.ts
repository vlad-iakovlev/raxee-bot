import * as fns from 'date-fns'
import { describe, expect, test } from 'vitest'
import { prisma } from '../../../utils/prisma.mock.js'
import { getWinner } from './getWinner.js'

describe('#getWinner', () => {
  test('should call prisma.pumpkinStats.findMany and return first player', async () => {
    const tgChatId = '123'
    const date = new Date()
    prisma.pumpkinStats.findMany.mockResolvedValueOnce([
      { player: 'player-1-mock' },
      { player: 'player-2-mock' },
    ] as any)

    const winner = await getWinner(tgChatId, date)

    expect(prisma.pumpkinStats.findMany).toHaveBeenCalledWith({
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

  test('should call prisma.pumpkinStats.findMany and return null if no stats found', async () => {
    const tgChatId = '123'
    const date = new Date()
    prisma.pumpkinStats.findMany.mockResolvedValueOnce([])

    const winner = await getWinner(tgChatId, date)

    expect(prisma.pumpkinStats.findMany).toHaveBeenCalledWith({
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
