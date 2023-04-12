import { Bot } from 'grammy'
import { initUserMiddleware } from '~/middleware/initUser.js'
import { BotModule } from '~/types/module.js'
import { handleError } from './handleError.js'

export interface RunBotOptions {
  botToken: string
  modules: BotModule[]
}

export const runBot = async ({ botToken, modules }: RunBotOptions) => {
  const bot = new Bot(botToken)
  await bot.api.setMyCommands(modules.map((module) => module.commands).flat())
  bot.use(initUserMiddleware, ...modules.map((module) => module.composer))
  bot.catch(handleError)
  await bot.start()
}
