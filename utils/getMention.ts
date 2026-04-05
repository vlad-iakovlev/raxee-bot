import { Markdown, md } from '@telegram-md/core'
import { User } from '@/prisma/index.js'
import { getUserName } from './getUserName.js'

export const getMention = (user: User): Markdown => {
  if (user.username) return md`@${user.username}`
  return md.link(getUserName(user), `tg://user?id=${user.tgUserId}`)
}
