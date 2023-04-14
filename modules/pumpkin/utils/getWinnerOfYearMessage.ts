import { md } from 'telegram-md'
import { getMention } from '../../../utils/getMention.js'
import { interpolate } from '../../../utils/interpolate.js'
import { PumpkinManager } from '../classes/PumpkinManager.js'
import { STRINGS } from '../constants.js'

export const getWinnerOfYearMessage = async (
  tgChatId: number,
  year: number
) => {
  const playersWithStats = await PumpkinManager.getStats(tgChatId, year)

  const maxWinnings = playersWithStats.reduce(
    (acc, player) => Math.max(acc, player.winnings),
    0
  )

  const winners = playersWithStats.filter(
    (player) => player.winnings > 0 && player.winnings === maxWinnings
  )

  return interpolate(
    STRINGS.pumpkinOfYear,
    year,
    winners.length
      ? md.join(
          winners.map((player) => getMention(player.user)),
          ', '
        )
      : 'IDK'
  )
}
