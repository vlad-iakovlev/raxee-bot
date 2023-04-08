import { MiddlewareFn } from 'grammy'
import { prisma } from '../utils/prisma'

export const initUserMiddleware: MiddlewareFn = async (ctx, next) => {
  if (ctx.from) {
    await prisma.user.upsert({
      where: {
        tgUserId: ctx.from.id,
      },
      create: {
        tgUserId: ctx.from.id,
        firstName: ctx.from.first_name,
        lastName: ctx.from.last_name,
        username: ctx.from.username,
      },
      update: {
        tgUserId: ctx.from.id,
        firstName: ctx.from.first_name,
        lastName: ctx.from.last_name,
        username: ctx.from.username,
      },
      select: {},
    })
  }

  await next()
}
