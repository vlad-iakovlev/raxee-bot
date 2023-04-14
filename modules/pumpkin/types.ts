import { PumpkinPlayer, User } from '@prisma/client'

export interface PumpkinPlayerWithUser extends PumpkinPlayer {
  user: User
}

export interface PumpkinPlayerWithStats extends PumpkinPlayerWithUser {
  winnings: number
}
