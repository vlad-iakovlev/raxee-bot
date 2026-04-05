import { PumpkinPlayer, User } from '@/prisma/index.js'

export type PumpkinPlayerWithUser = PumpkinPlayer & {
  user: User
}

export type PumpkinPlayerWithStats = PumpkinPlayerWithUser & {
  winnings: number
}
