import * as fns from 'date-fns'
import { prisma } from '../../../utils/prisma.ts'
import { PumpkinPlayerWithStats } from '../types.ts'

export const getStats = async (
  tgChatId: number,
  year?: number,
): Promise<PumpkinPlayerWithStats[]> => {
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
    winnings: stats.find((stat) => stat.playerId === player.id)?._count.id ?? 0,
  }))

  return playersWithStats
}
