import { prisma } from '../../../utils/prisma.ts'
import { PumpkinPlayerWithUser } from '../types.ts'

export const getPlayers = async (
  tgChatId: number,
): Promise<PumpkinPlayerWithUser[]> => {
  return await prisma.pumpkinPlayer.findMany({
    where: {
      tgChatId,
    },
    include: {
      user: true,
    },
  })
}
