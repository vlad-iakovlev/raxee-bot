import { md } from 'telegram-md'
import { getUserName } from '../../../utils/getUserName.js'
import { interpolate } from '../../../utils/interpolate.js'
import { PumpkinManager } from '../classes/PumpkinManager.js'
import { PumpkinStringsManager } from '../classes/PumpkinStringsManager.js'

export const getStatsMessage = async (tgChatId: number, year?: number) => {
  const strings = await PumpkinStringsManager.load(tgChatId)
  const playersWithStats = await PumpkinManager.getStats(tgChatId, year)

  const playersWithWinnings = playersWithStats
    .filter((player) => player.winnings > 0)
    .sort((a, b) => b.winnings - a.winnings)

  return md.join(
    [
      strings.get(year ? 'statsTitleYear' : 'statsTitleAllTime'),
      '',
      ...playersWithWinnings.map((player, index) =>
        interpolate(
          strings.get('statsPlayer'),
          index + 1,
          getUserName(player.user),
          player.winnings
        )
      ),
      '',
      interpolate(strings.get('statsTotalPlayers'), playersWithStats.length),
    ],
    '\n'
  )
}
