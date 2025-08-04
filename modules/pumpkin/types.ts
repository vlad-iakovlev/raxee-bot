import { PumpkinPlayer, User } from '@prisma/client'

export type PumpkinPlayerWithUser = PumpkinPlayer & {
  user: User
}

export type PumpkinPlayerWithStats = PumpkinPlayerWithUser & {
  winnings: number
}
