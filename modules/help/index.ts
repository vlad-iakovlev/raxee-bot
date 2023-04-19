import { Composer, Context } from 'grammy'
import { replyWithMarkdownPlugin } from 'grammy-reply-with-markdown'
import { BotModule } from '../../types/module.ts'
import { STRINGS } from './constants.ts'

const createComposer = () => {
  const bot = new Composer(replyWithMarkdownPlugin())

  bot.command('start', async (ctx) => {
    await ctx.replyWithMarkdown(STRINGS.help, {
      disable_notification: true,
      disable_web_page_preview: true,
    })
  })

  bot.command('help', async (ctx) => {
    await ctx.replyWithMarkdown(STRINGS.help, {
      disable_notification: true,
      disable_web_page_preview: true,
    })
  })

  return bot as unknown as Composer<Context>
}

export const createHelpModule = (): BotModule => ({
  commands: [
    {
      command: 'help',
      description: 'Show help',
    },
  ],
  composer: createComposer(),
})
