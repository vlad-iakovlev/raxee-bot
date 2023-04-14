import { md } from 'telegram-md'
import { getUserName } from '../../../utils/getUserName.js'
import { interpolate } from '../../../utils/interpolate.js'
import { PumpkinManager } from '../classes/PumpkinManager.js'
import { STRINGS } from '../constants.js'

export const getStatsMessage = async (tgChatId: number, year?: number) => {
  const playersWithStats = await PumpkinManager.getStats(tgChatId, year)

  const playersWithWinnings = playersWithStats
    .filter((player) => player.winnings > 0)
    .sort((a, b) => b.winnings - a.winnings)

  return md.join(
    [
      year ? STRINGS.statsTitleYear : STRINGS.statsTitleAllTime,
      '',
      ...playersWithWinnings.map((player, index) =>
        interpolate(
          STRINGS.statsPlayer,
          index + 1,
          getUserName(player.user),
          player.winnings
        )
      ),
      '',
      interpolate(STRINGS.statsCount, playersWithStats.length),
    ],
    '\n'
  )
}
