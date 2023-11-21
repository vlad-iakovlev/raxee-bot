import { POKER_ROUND, User } from '@prisma/client'
import { ROUND, RoomData, RoomStorage } from '@vlad-yakovlev/poker'
import { prisma } from '../../../utils/prisma.js'

export class PokerStorage implements RoomStorage<undefined, User> {
  async get(id: string): Promise<RoomData | undefined> {
    const stateData = await prisma.pokerState.upsert({
      where: {
        tgChatId: id,
      },
      create: {
        tgChatId: id,
        cards: [],
        round: POKER_ROUND.PREFLOP,
        dealsCount: 0,
        dealerIndex: 0,
        currentPlayerIndex: 0,
      },
      update: {},
      include: {
        players: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    })

    return {
      id: stateData.tgChatId,
      cards: stateData.cards,
      round: stateData.round as ROUND,
      dealsCount: stateData.dealsCount,
      dealerIndex: stateData.dealerIndex,
      currentPlayerIndex: stateData.currentPlayerIndex,
      players: stateData.players.map((player) => ({
        id: player.user.id,
        cards: player.cards,
        balance: player.balance,
        betAmount: player.betAmount,
        hasFolded: player.hasFolded,
        hasLost: player.hasLost,
        hasTurned: player.hasTurned,
        payload: player.user,
      })),
      payload: undefined,
    }
  }

  async set(id: string, roomData: RoomData): Promise<void> {
    const stateData = {
      tgChatId: roomData.id,
      cards: roomData.cards,
      round: roomData.round,
      dealsCount: roomData.dealsCount,
      dealerIndex: roomData.dealerIndex,
      currentPlayerIndex: roomData.currentPlayerIndex,
    }

    await prisma.$transaction([
      prisma.pokerState.upsert({
        where: {
          tgChatId: id,
        },
        create: stateData,
        update: stateData,
      }),

      ...roomData.players.map((player) => {
        const playerData = {
          cards: player.cards,
          balance: player.balance,
          betAmount: player.betAmount,
          hasFolded: player.hasFolded,
          hasLost: player.hasLost,
          hasTurned: player.hasTurned,
          user: {
            connect: {
              id: player.id,
            },
          },
          state: {
            connect: {
              tgChatId: id,
            },
          },
        }

        return prisma.pokerPlayer.upsert({
          where: {
            userId: player.id,
          },
          create: playerData,
          update: playerData,
        })
      }),

      prisma.pokerPlayer.deleteMany({
        where: {
          state: {
            tgChatId: id,
          },
          user: {
            NOT: {
              id: {
                in: roomData.players.map((player) => player.id),
              },
            },
          },
        },
      }),
    ])
  }

  async delete(id: string): Promise<void> {
    await prisma.pokerState.delete({
      where: {
        tgChatId: id,
      },
    })
  }
}
