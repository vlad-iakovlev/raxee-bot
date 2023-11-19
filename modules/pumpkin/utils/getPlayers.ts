import { prisma } from '../../../utils/prisma.js'
import { PumpkinPlayerWithUser } from '../types.js'

export const getPlayers = async (
  tgChatId: string,
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
