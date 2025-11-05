import { User } from '@prisma/client'

export const getUserName = (user: User) =>
  user.username ?? [user.firstName, user.lastName].filter(Boolean).join(' ')
