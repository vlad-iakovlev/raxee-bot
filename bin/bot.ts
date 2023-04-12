import { createPokerModule } from '@raxee-bot/poker'
import { createVoiceModule } from '@raxee-bot/voice'
import * as dotenv from 'dotenv-flow'
import { runBot } from '~/utils/runBot.js'

void (async () => {
  try {
    dotenv.config()

    const botToken = process.env.BOT_TOKEN
    if (!botToken) {
      throw new Error('You should set BOT_TOKEN in .env file')
    }

    await runBot({
      botToken,
      modules: [createPokerModule(), createVoiceModule()],
    })

    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
