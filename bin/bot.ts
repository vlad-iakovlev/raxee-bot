import * as dotenv from 'dotenv-flow'
import { createHelpModule } from '../modules/help/index.js'
import { createPokerModule } from '../modules/poker/index.js'
import { createPumpkinModule } from '../modules/pumpkin/index.js'
import { createVoiceModule } from '../modules/voice/index.js'
import { runBot } from '../utils/runBot.js'

void (async () => {
  try {
    dotenv.config()

    const botToken = process.env.BOT_TOKEN
    if (!botToken) {
      throw new Error('You should set BOT_TOKEN in .env file')
    }

    await runBot({
      botToken,
      modules: [
        createPumpkinModule(),
        createPokerModule(),
        createVoiceModule(),
        createHelpModule(),
      ],
    })

    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
