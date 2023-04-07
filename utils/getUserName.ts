import { User } from '@prisma/client'

export const getUserName = (user?: User) => {
  if (!user) return ''

  return (
    user.username ?? [user.firstName, user.lastName].filter(Boolean).join(' ')
  )
}
