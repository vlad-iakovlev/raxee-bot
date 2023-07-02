import { autoRetry } from '@grammyjs/auto-retry'
import { run, sequentialize } from '@grammyjs/runner'
import assert from 'assert'
import { Bot, Composer } from 'grammy'
import { initUserMiddleware } from '../middleware/initUser.ts'
import { createHelpModule } from '../modules/help/index.ts'
import { createPokerModule } from '../modules/poker/index.ts'
import { createPumpkinModule } from '../modules/pumpkin/index.ts'
import { createVoiceModule } from '../modules/voice/index.ts'
import { handleError } from '../utils/handleError.ts'

void (async () => {
  try {
    assert(process.env.BOT_TOKEN, 'BOT_TOKEN is not defined')

    const helpModule = createHelpModule()
    const modules = [
      {
        commands: [],
        composer: helpModule.composer,
      },
      createPumpkinModule(),
      createPokerModule(),
      createVoiceModule(),
      {
        commands: helpModule.commands,
        composer: new Composer(),
      },
    ]

    const bot = new Bot(process.env.BOT_TOKEN)
    bot.api.config.use(autoRetry())
    bot.use(sequentialize((ctx) => ctx.chat?.id.toString()))

    await bot.api.setMyCommands(modules.map((module) => module.commands).flat())
    bot.use(initUserMiddleware, ...modules.map((module) => module.composer))
    bot.catch(handleError)

    const runner = run(bot)
    const stopRunner = () => void (runner.isRunning() && runner.stop())
    process.once('SIGINT', stopRunner)
    process.once('SIGTERM', stopRunner)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
