import { Composer } from 'grammy'
import { BotModule } from '../../types/module.js'
import { getRandomItem } from '../../utils/getRandomItem.js'
import { STICKERS } from './constants.js'

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
