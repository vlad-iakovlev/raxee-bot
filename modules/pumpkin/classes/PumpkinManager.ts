import * as fns from 'date-fns'
import { prisma } from '../../../utils/prisma.js'
import { PumpkinPlayerWithStats, PumpkinPlayerWithUser } from '../types.js'

export class PumpkinManager {
  static async findWinner(
    tgChatId: number,
    date: Date
  ): Promise<PumpkinPlayerWithUser | null> {
    const stats = await prisma.pumpkinStats.findMany({
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

    return stats[0]?.player || null
  }

  static async createWinner(playerId: string, date: Date): Promise<void> {
    await prisma.pumpkinStats.create({
      data: {
        date,
        player: {
          connect: {
            id: playerId,
          },
        },
      },
    })
  }

  static async findPlayers(tgChatId: number): Promise<PumpkinPlayerWithUser[]> {
    return await prisma.pumpkinPlayer.findMany({
      where: {
        tgChatId,
      },
      include: {
        user: true,
      },
    })
  }

  static async findOrCreatePlayer(
    tgChatId: number,
    tgUserId: number
  ): Promise<PumpkinPlayerWithUser> {
    const existingPlayer = await prisma.pumpkinPlayer.findFirst({
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

    if (existingPlayer) return existingPlayer

    return await prisma.pumpkinPlayer.create({
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
  }

  static async getStats(
    tgChatId: number,
    year?: number
  ): Promise<PumpkinPlayerWithStats[]> {
    const players = await prisma.pumpkinPlayer.findMany({
      where: {
        tgChatId,
      },
      include: {
        user: true,
      },
    })

    const stats = await prisma.pumpkinStats.groupBy({
      by: ['playerId'],
      where: {
        player: {
          tgChatId,
        },
        ...(year && {
          date: {
            gte: fns.startOfYear(new Date(String(year))),
            lte: fns.endOfYear(new Date(String(year))),
          },
        }),
      },
      _count: {
        id: true,
      },
    })

    const playersWithStats = players.map((player) => ({
      ...player,
      winnings:
        stats.find((stat) => stat.playerId === player.id)?._count.id || 0,
    }))

    return playersWithStats
  }
}
