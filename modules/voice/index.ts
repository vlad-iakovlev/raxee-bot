import { Composer } from 'grammy'
import { getRandomItem } from '../../utils/getRandomItem'
import { voiceStickers } from './constants'

const createComposer = () => {
  const bot = new Composer()

  bot.on(['message:voice', 'message:video_note'], async (ctx, next) => {
    await ctx.replyWithSticker(getRandomItem(voiceStickers))
    await next()
  })

  return bot
}

export const createVoiceModule = () => ({
  commands: [],
  composer: createComposer(),
})
