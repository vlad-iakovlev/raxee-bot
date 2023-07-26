import { prisma } from '../../../utils/prisma.ts'
import { PumpkinPlayerWithUser } from '../types.ts'

export const getOrAddPlayer = async (
  tgChatId: string,
  tgUserId: string,
): Promise<PumpkinPlayerWithUser> => {
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
