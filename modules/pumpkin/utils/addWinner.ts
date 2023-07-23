import { prisma } from '../../../utils/prisma.ts'

export const addWinner = async (
  playerId: string,
  date: Date,
): Promise<void> => {
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
