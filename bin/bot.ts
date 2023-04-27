import assert from 'assert'
import { Composer } from 'grammy'
import { createHelpModule } from '../modules/help/index.ts'
import { createPokerModule } from '../modules/poker/index.ts'
import { createPumpkinModule } from '../modules/pumpkin/index.ts'
import { createVoiceModule } from '../modules/voice/index.ts'
import { runBot } from '../utils/runBot.ts'

void (async () => {
  try {
    assert(process.env.BOT_TOKEN, 'BOT_TOKEN is not defined')

    const helpModule = createHelpModule()

    await runBot({
      botToken: process.env.BOT_TOKEN,
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
