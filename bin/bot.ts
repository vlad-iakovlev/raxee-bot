import * as dotenv from 'dotenv-flow'
import { Composer } from 'grammy'
import { createHelpModule } from '../modules/help/index.ts'
import { createPokerModule } from '../modules/poker/index.ts'
import { createPumpkinModule } from '../modules/pumpkin/index.ts'
import { createVoiceModule } from '../modules/voice/index.ts'
import { runBot } from '../utils/runBot.ts'

void (async () => {
  try {
    dotenv.config()

    const botToken = process.env.BOT_TOKEN
    if (!botToken) {
      throw new Error('You should set BOT_TOKEN in .env file')
    }

    const helpModule = createHelpModule()

    await runBot({
      botToken,
      modules: [
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
      ],
    })

    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
