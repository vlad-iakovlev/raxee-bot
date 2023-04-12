import { User } from '@prisma/client'
import { Markdown, md } from 'telegram-md'
import { getUserName } from './getUserName.js'

export const getMention = (user?: User): Markdown => {
  if (user?.username) return md`@${user.username}`
  return md.link(getUserName(user), `tg://user?id=${user?.tgUserId}`)
}
