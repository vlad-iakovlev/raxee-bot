import { MiddlewareFn } from 'grammy'
import { prisma } from '../utils/prisma.js'

export const initUserMiddleware: MiddlewareFn = async (ctx, next) => {
  if (ctx.from) {
    await prisma.user.upsert({
      where: {
        tgUserId: String(ctx.from.id),
      },
      create: {
        tgUserId: String(ctx.from.id),
        firstName: ctx.from.first_name,
        lastName: ctx.from.last_name,
        username: ctx.from.username,
      },
      update: {
        firstName: ctx.from.first_name,
        lastName: ctx.from.last_name,
        username: ctx.from.username,
      },
      select: {
        id: true,
      },
    })
  }

  await next()
}
