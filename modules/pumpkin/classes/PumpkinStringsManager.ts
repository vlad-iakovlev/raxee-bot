import { Markdown } from 'telegram-md'
import { getRandomItem } from '../../../utils/getRandomItem.ts'
import { prisma } from '../../../utils/prisma.ts'
import { STRINGS } from '../constants.ts'

interface Strings {
  hello: (string | Markdown)[]
  notEnoughPlayers: (string | Markdown)[]
  earlyWinner: (string | Markdown)[]
  newWinner1: (string | Markdown)[]
  newWinner2: (string | Markdown)[]
  newWinner3: (string | Markdown)[]
  newWinner4: (string | Markdown)[]
  newWinnerNewYear: (string | Markdown)[]
  pumpkinOfYear: (string | Markdown)[]
  replyForWinner: (string | Markdown)[]
  statsTitleAllTime: (string | Markdown)[]
  statsTitleYear: (string | Markdown)[]
  statsPlayer: (string | Markdown)[]
  statsTotalPlayers: (string | Markdown)[]
}

export class PumpkinStringsManager {
  chatStrings: Partial<Strings>

  constructor(chatStrings: Partial<Strings>) {
    this.chatStrings = chatStrings
  }

  static async load(this: void, tgChatId: number) {
    const chatStrings = await prisma.pumpkinStrings.findFirst({
      where: {
        tgChatIds: {
          has: tgChatId,
        },
      },
    })

    return new PumpkinStringsManager(chatStrings ?? {})
  }

  get(key: keyof Strings): string | Markdown {
    const chatString = this.chatStrings[key]
    if (chatString?.length) {
      return new Markdown(getRandomItem(chatString), true)
    }

    return getRandomItem<string | Markdown>(STRINGS[key])
  }
}
