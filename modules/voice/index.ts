import { Composer } from 'grammy'
import { BotModule } from '../../types/module.ts'
import { getRandomItem } from '../../utils/getRandomItem.ts'
import { STICKERS } from './constants.ts'

const createComposer = () => {
  const bot = new Composer()

  bot.on(['message:voice', 'message:video_note'], async (ctx, next) => {
    await ctx.replyWithSticker(getRandomItem(STICKERS))
    await next()
  })

  return bot
}

export const createVoiceModule = (): BotModule => ({
  commands: [],
  composer: createComposer(),
})
