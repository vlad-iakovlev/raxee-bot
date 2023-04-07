import { Composer } from 'grammy'
import { getRandomItem } from '../../utils/getRandomItem'
import { STICKERS } from './constants'
import { BotModule } from '../../types/module'

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
