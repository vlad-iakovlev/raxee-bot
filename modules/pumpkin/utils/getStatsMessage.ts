import { md } from '@vlad-yakovlev/telegram-md'
import { getUserName } from '../../../utils/getUserName.js'
import { interpolate } from '../../../utils/interpolate.js'
import { PumpkinStringsManager } from '../classes/PumpkinStringsManager.js'
import { getStats } from './getStats.js'

export const getStatsMessage = async (tgChatId: string, year?: number) => {
  const strings = await PumpkinStringsManager.load(tgChatId)
  const playersWithStats = await getStats(tgChatId, year)

  const playersWithWinnings = playersWithStats
    .filter((player) => player.winnings > 0)
    .sort((a, b) => b.winnings - a.winnings)

  return md.join(
    [
      strings.get(year ? 'statsTitleYear' : 'statsTitleAllTime'),
      '',
      ...playersWithWinnings.map((player, index) => {
        let realIndex = index
        while (
          realIndex > 0 &&
          player.winnings === playersWithWinnings[realIndex - 1].winnings
        ) {
          realIndex--
        }

        return interpolate(
          strings.get('statsPlayer'),
          realIndex + 1,
          getUserName(player.user),
          player.winnings,
        )
      }),
      '',
      interpolate(strings.get('statsTotalPlayers'), playersWithStats.length),
    ],
    '\n',
  )
}
