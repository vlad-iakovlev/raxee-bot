import { User } from '@/prisma/index.js'

export const getUserName = (user: User) =>
  user.username ?? [user.firstName, user.lastName].filter(Boolean).join(' ')
