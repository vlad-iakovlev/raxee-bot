// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv-flow').config()

import { createVoiceModule } from '../modules/voice'
import { runBot } from '../utils/runBot'

void (async () => {
  try {
    const botToken = process.env.BOT_TOKEN
    if (!botToken) {
      throw new Error('You should set BOT_TOKEN in .env file')
    }

    await runBot({
      botToken,
      modules: [createVoiceModule()],
    })

    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
