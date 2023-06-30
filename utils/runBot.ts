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

  // Stopping the bot when the Node.js process is about to be terminated
  // istanbul ignore next
  process.once('SIGINT', () => void bot.stop())
  // istanbul ignore next
  process.once('SIGTERM', () => void bot.stop())

  await bot.start()
}
