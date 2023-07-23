import * as fns from 'date-fns'
import { prisma } from '../../../utils/prisma.ts'
import { PumpkinPlayerWithUser } from '../types.ts'

export const getWinner = async (
  tgChatId: number,
  date: Date,
): Promise<PumpkinPlayerWithUser | null> => {
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

  return stats[0]?.player ?? null
}
