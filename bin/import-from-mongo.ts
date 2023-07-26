import fs from 'fs'
import path from 'path'
import { v4 as uuid } from 'uuid'
import { prisma } from '../utils/prisma.ts'

interface MongoUser {
  _id: { $oid: string }
  tgUserId: number | { $numberLong: string }
  firstName: string
  lastName: string
  username: string
}

interface MongoPumpkinPlayer {
  _id: { $oid: string }
  tgChatId: number | { $numberLong: string }
  userId: { $oid: string }
}

interface MongoPumpkinStats {
  _id: { $oid: string }
  date: { $date: string }
  playerId: { $oid: string }
}

interface MongoPumpkinStrings {
  _id: { $oid: string }
  notEnoughPlayers: string[]
  earlyWinner: string[]
  newWinner1: string[]
  newWinner2: string[]
  newWinner3: string[]
  newWinner4: string[]
  newWinnerNewYear: string[]
  pumpkinOfYear: string[]
  replyForWinner: string[]
  statsTitleAllTime: string[]
  statsTitleYear: string[]
  statsPlayer: string[]
  statsTotalPlayers: string[]
  tgChatIds: (number | { $numberLong: string })[]
}

const readJson = async <T>(name: string): Promise<T[]> => {
  const currenciesStr = await fs.promises.readFile(
    path.join(process.cwd(), `/from-mongo/${name}.json`),
    'utf8',
  )

  return JSON.parse(currenciesStr) as T[]
}

const createIdMap = (items: { _id: { $oid: string } }[]) => {
  return items.reduce<Record<string, string>>((acc, item) => {
    acc[item._id.$oid] = uuid()

    return acc
  }, {})
}

const parseDate = (date: { $date: string }) => {
  return new Date(date.$date)
}

const parseTgId = (chatId: number | { $numberLong: string }) => {
  return typeof chatId === 'number' ? String(chatId) : chatId.$numberLong
}

const importUsers = async (props: {
  users: MongoUser[]
  userIdMap: Record<string, string>
}) => {
  await prisma.$transaction(
    props.users.map((user) =>
      prisma.user.create({
        data: {
          id: props.userIdMap[user._id.$oid],
          tgUserId: parseTgId(user.tgUserId),
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
        },
      }),
    ),
  )
}

const importPumpkinPlayers = async (props: {
  pumpkinPlayers: MongoPumpkinPlayer[]
  userIdMap: Record<string, string>
  pumpkinPlayerIdMap: Record<string, string>
}) => {
  await prisma.$transaction(
    props.pumpkinPlayers.map((pumpkinPlayer) =>
      prisma.pumpkinPlayer.create({
        data: {
          id: props.pumpkinPlayerIdMap[pumpkinPlayer._id.$oid],
          tgChatId: parseTgId(pumpkinPlayer.tgChatId),
          userId: props.userIdMap[pumpkinPlayer.userId.$oid],
        },
      }),
    ),
  )
}

const importPumpkinStats = async (props: {
  pumpkinStats: MongoPumpkinStats[]
  pumpkinPlayerIdMap: Record<string, string>
}) => {
  await prisma.$transaction(
    props.pumpkinStats.map((pumpkinStat) =>
      prisma.pumpkinStats.create({
        data: {
          date: parseDate(pumpkinStat.date),
          player: {
            connect: {
              id: props.pumpkinPlayerIdMap[pumpkinStat.playerId.$oid],
            },
          },
        },
      }),
    ),
  )
}

const importPumpkinStrings = async (props: {
  pumpkinStrings: MongoPumpkinStrings
}) => {
  await prisma.pumpkinStrings.create({
    data: {
      id: uuid(),
      notEnoughPlayers: props.pumpkinStrings.notEnoughPlayers,
      earlyWinner: props.pumpkinStrings.earlyWinner,
      newWinner1: props.pumpkinStrings.newWinner1,
      newWinner2: props.pumpkinStrings.newWinner2,
      newWinner3: props.pumpkinStrings.newWinner3,
      newWinner4: props.pumpkinStrings.newWinner4,
      newWinnerNewYear: props.pumpkinStrings.newWinnerNewYear,
      pumpkinOfYear: props.pumpkinStrings.pumpkinOfYear,
      replyForWinner: props.pumpkinStrings.replyForWinner,
      statsTitleAllTime: props.pumpkinStrings.statsTitleAllTime,
      statsTitleYear: props.pumpkinStrings.statsTitleYear,
      statsPlayer: props.pumpkinStrings.statsPlayer,
      statsTotalPlayers: props.pumpkinStrings.statsTotalPlayers,
      tgChatIds: props.pumpkinStrings.tgChatIds.map((id) => parseTgId(id)),
    },
  })
}

void (async () => {
  try {
    const users = await readJson<MongoUser>('raxee-bot.User')
    const pumpkinPlayers = await readJson<MongoPumpkinPlayer>(
      'raxee-bot.PumpkinPlayer',
    )
    const pumpkinStats = await readJson<MongoPumpkinStats>(
      'raxee-bot.PumpkinStats',
    )
    const pumpkinStrings = await readJson<MongoPumpkinStrings>(
      'raxee-bot.PumpkinStrings',
    )

    const userIdMap = createIdMap(users)
    const pumpkinPlayerIdMap = createIdMap(pumpkinPlayers)

    await importUsers({
      users,
      userIdMap,
    })

    await importPumpkinPlayers({
      pumpkinPlayers,
      userIdMap,
      pumpkinPlayerIdMap,
    })

    await importPumpkinStats({
      pumpkinStats,
      pumpkinPlayerIdMap,
    })

    await importPumpkinStrings({
      pumpkinStrings: pumpkinStrings[0],
    })

    process.exit(0)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
