import { prisma } from '@/prisma/index.js'
import { PumpkinPlayerWithUser } from '../types.js'

export const getPlayers = async (
  tgChatId: string,
): Promise<PumpkinPlayerWithUser[]> =>
  await prisma.pumpkinPlayer.findMany({
    where: {
      tgChatId,
    },
    include: {
      user: true,
    },
  })
