import { Bot } from 'grammy'
import { initUserMiddleware } from '../middleware/initUser.ts'
import { BotModule } from '../types/module.ts'
import { handleError } from './handleError.ts'

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
