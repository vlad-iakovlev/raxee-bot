import { md } from '@vlad-yakovlev/telegram-md'
import { getMention } from '../../utils/getMention.js'
import { PokerPlayerManager } from './classes/PokerPlayerManger.js'
import {
  POKER_CARD_SUIT,
  POKER_CARD_VALUE,
  POKER_COMBINATION_LEVEL,
} from './types.js'
import { getPokerCardString } from './utils/getPokerCardString.js'

export const DEFAULT_BALANCE = 1000

export const BASE_BET = 20

export const POKER_CARD_SUIT_NAMES = {
  [POKER_CARD_SUIT.CLUBS]: '♣️',
  [POKER_CARD_SUIT.DIAMONDS]: '♦️',
  [POKER_CARD_SUIT.HEARTS]: '♥️',
  [POKER_CARD_SUIT.SPADES]: '♠️',
} as const

export const POKER_CARD_VALUE_NAMES = {
  [POKER_CARD_VALUE.TWO]: '2',
  [POKER_CARD_VALUE.THREE]: '3',
  [POKER_CARD_VALUE.FOUR]: '4',
  [POKER_CARD_VALUE.FIVE]: '5',
  [POKER_CARD_VALUE.SIX]: '6',
  [POKER_CARD_VALUE.SEVEN]: '7',
  [POKER_CARD_VALUE.EIGHT]: '8',
  [POKER_CARD_VALUE.NINE]: '9',
  [POKER_CARD_VALUE.TEN]: '10',
  [POKER_CARD_VALUE.JACK]: 'J',
  [POKER_CARD_VALUE.QUEEN]: 'Q',
  [POKER_CARD_VALUE.KING]: 'K',
  [POKER_CARD_VALUE.ACE]: 'A',
} as const

export const POKER_COMBINATION_LEVEL_NAMES = {
  [POKER_COMBINATION_LEVEL.HIGH_CARD]: 'High Card',
  [POKER_COMBINATION_LEVEL.PAIR]: 'Pair',
  [POKER_COMBINATION_LEVEL.TWO_PAIR]: 'Two Pair',
  [POKER_COMBINATION_LEVEL.THREE_OF_KIND]: 'Three of a Kind',
  [POKER_COMBINATION_LEVEL.STRAIGHT]: 'Straight',
  [POKER_COMBINATION_LEVEL.FLUSH]: 'Flush',
  [POKER_COMBINATION_LEVEL.FULL_HOUSE]: 'Full House',
  [POKER_COMBINATION_LEVEL.FOUR_OF_KIND]: 'Four of a Kind',
  [POKER_COMBINATION_LEVEL.STRAIGHT_FLUSH]: 'Straight Flush',
  [POKER_COMBINATION_LEVEL.ROYAL_FLUSH]: 'Royal Flush',
} as const

export const STRINGS = {
  allIn: '💰 All in',
  amount: (value: number | string) => `${value} 🪙`,
  pot: (value: number | string) => `Pot: ${value} 🪙`,
  call: (value: number | string) => `✅ ${value}`,
  check: '✊ Check',
  fold: '❌ Fold',
  preflop: 'Preflop',
  win: '🏆 Win',
}

// prettier-ignore
export const MESSAGES = {
  _: {
    dealStarted: ({ players, dealer, small, big }: {
      players: PokerPlayerManager[],
      dealer: PokerPlayerManager,
      small: PokerPlayerManager,
      big: PokerPlayerManager
    }) =>
      md.join(
        [
          md.bold('Who is in the game:'),
          ...players.map((player) =>
            md.join(
              [
                '\u2022',
                getMention(player.user),
                `(${STRINGS.amount(player.balance + player.betAmount)})`,
                player.balance === 0 && STRINGS.allIn,
              ].filter(Boolean),
              ' '
            )
          ),
          '',
          md`${md.bold('Dealer:')} ${getMention(dealer.user)}`,
          md`${md.bold('Small:')} ${getMention(small.user)} (${STRINGS.amount(small.betAmount)})`,
          md`${md.bold('Big:')} ${getMention(big.user)} (${STRINGS.amount(big.betAmount)})`,
        ],
        '\n'
      ),
    dealEnded: ({ tableCards, players }: {
      tableCards: number[],
      players: PokerPlayerManager[]
    }) =>
      md.join(
        [
          `Table: ${tableCards.map(getPokerCardString).join(' ')}`,
          ...players.map((player) =>
            md.join(
              [
                md`${getMention(player.user)}: ${player.cards.map(getPokerCardString).join(' ')}`,
                [
                  player.bestCombination?.getString(),
                  player.hasFolded && STRINGS.fold,
                  player.isWinner && STRINGS.win,
                ]
                  .filter(Boolean)
                  .join(' '),
              ].filter(Boolean),
              '\n'
            )
          ),
        ],
        '\n\n'
      ),
    gameEnded: 'Game over, folks!',
    userTurn: (player: PokerPlayerManager) => md`${getMention(player.user)}, your turn!`,
    playerMessage: (player: PokerPlayerManager, message: string) => md`${getMention(player.user)}: ${message}`,
  },

  onMessage: {
    foldNotAllowed: "Folding is not allowed",
    checkNotAllowed: "Checking is not allowed",
    callNotAllowed: "Calling is not allowed",
    allInNotAllowed: "Going all in is not allowed",
    raiseNotAllowed: "Raising is not allowed",
    betTooBig: 'That bet is too large',
    betTooSmall: 'That bet is too small',
    unknownCommand: "I didn't understand you, but I shared your message with everyone",
    wrongTurn: "It's not your turn now, but I shared your message with everyone",
  },

  pokerJoin: {
    alreadyStarted: 'A game is already in progress in this chat',
    duplicateOtherChat: 'You are already in a game in another chat',
    duplicateSameChat: 'You are already in a game in this chat',
    registered: md`Get ready, you've joined the game. To communicate with me, ${md.link('start a chat', 'https://t.me/raxee_bot')}`,
    tooMany: 'There are too many players in this chat, wait for the current game to end',
  },

  pokerStart: {
    alreadyStarted: 'A game is already in progress in this chat, please wait for it to finish',
    started: md`Proceed to the ${md.link('PM', 'https://t.me/raxee_bot')}, the game has begun`,
    tooFew: 'Not enough players, use /poker_join to add more',
  },

  pokerStopGroup: {
    cancelled: 'The game in this chat has been cancelled',
    stopped: 'The game in this chat has been stopped',
  },

  pokerStopPrivate: {
    notFound: 'You are not currently in a game',
  },
}

export const STICKERS = [
  'CAACAgIAAxkBAAIMTWLDXSBtPvO6simMAoERFOb3h4-qAAJcAQACPQ3oBAABMsv78bItBCkE',
  'CAACAgIAAxkBAAIMT2LDXUySk7O9FuUYLdM7nORoabV_AALCAQACPQ3oBHwoB5GHkvIFKQQ',
  'CAACAgIAAxkBAAIMUWLDXVSCyaYBKZQFGVveI7CLNWjMAAJdAQACPQ3oBCjTPR_2UH5lKQQ',
  'CAACAgIAAxkBAAIMU2LDXV2k1B076cTTsIgWyilmr_ghAAJ_AQACPQ3oBL3xcqmoMiUoKQQ',
  'CAACAgIAAxkBAAIMVWLDXWspvHxp5JHcTRpQAfkphWtTAAJtAQACPQ3oBAPQUbk0UsTDKQQ',
  'CAACAgIAAxkBAAIMV2LDXXN_e94VwKziZLJPU8eckphvAAJgAQACPQ3oBD7wHLpauaCSKQQ',
  'CAACAgIAAxkBAAIMWWLDXXuoAlTchSTDOLRdrQagAtP0AAJiAQACPQ3oBBvmwIFyEW94KQQ',
  'CAACAgIAAxkBAAIMW2LDXYN9bYFj0PqHKlloSiiftMoPAAJjAQACPQ3oBF9OWWqaPMdwKQQ',
  'CAACAgIAAxkBAAIMXWLDXY2ahRS7koafnU4Yl0HnUTDpAAKIAQACPQ3oBDsAAS_6ars-VikE',
  'CAACAgIAAxkBAAIMX2LDXZTN9o839TVq7mIsX0VN9xiaAAJ2AQACPQ3oBBoOXWSygkzpKQQ',
  'CAACAgIAAxkBAAIMYWLDXaBwflUtgQHDBEZs70t7BlXrAAJlAQACPQ3oBIxK4cJVO_rzKQQ',
  'CAACAgIAAxkBAAIMY2LDXadFKIz80734i5SKpPbUd1lrAAJmAQACPQ3oBOMh-z8iW4cZKQQ',
  'CAACAgIAAxkBAAIMZWLDXa-zTghjcu1TIUBFRNp1qeWMAAK9DwACrGJhSz84smHrO6AnKQQ',
  'CAACAgIAAxkBAAIMZ2LDXbYsRS1pD_Xcu73WoKwq7wYHAAKAAQACPQ3oBL68Ur71xkeYKQQ',
  'CAACAgIAAxkBAAIMaWLDXcEt40sRdxc3VvjfN_1IMW1zAAKJAQACPQ3oBBMynEeF7WTrKQQ',
  'CAACAgIAAxkBAAIMa2LDXc4nM_5Np3x6QrD_CSCbpl-0AALbAQACPQ3oBNXTF0r9yu1QKQQ',
  'CAACAgIAAxkBAAIMbWLDXdegBSxYOaZpZ0qARV2NSVc8AAJoAQACPQ3oBPKZwg2PgLtjKQQ',
  'CAACAgIAAxkBAAIMb2LDXeBpORwQHTGUSq2vz9FmZX-rAAJpAQACPQ3oBAsxDlXNEwfsKQQ',
  'CAACAgIAAxkBAAIMcWLDXexd3e8nxRzlnpCh-Z_AM77wAALFAQACPQ3oBOdBQtf1YCO8KQQ',
  'CAACAgIAAxkBAAIMc2LDXfNV9h_b37Mj7eNXbVYlaZqVAALGAQACPQ3oBGtCxtKbgRk6KQQ',
  'CAACAgIAAxkBAAIMdWLDXftIWvgGXI1T-I-Eso9xktcSAAIUDwAC1I9gS7jbkdj0UX0_KQQ',
  'CAACAgIAAxkBAAIMd2LDXgNDWOaasBf3jbd4U0ml3jwuAALHAQACPQ3oBImPywI120eBKQQ',
  'CAACAgIAAxkBAAIMeWLDXgnLZcTWTzBDUQuc55hHz9aVAALIAQACPQ3oBFsUWwfxOHQGKQQ',
  'CAACAgIAAxkBAAIMe2LDXhNSrRhQ_QSXel2fM6uHjRsmAAJwAQACPQ3oBOlvvpLr8GSDKQQ',
  'CAACAgIAAxkBAAIMfWLDXiWuhhzmm2kpoOY1LE5GeiJSAAKEAQACPQ3oBOJOJmhYTDa5KQQ',
  'CAACAgIAAxkBAAIMf2LDXi1NHJk41YbEguU5M6n_d0ZNAAJvAQACPQ3oBDl_KLt4Lr__KQQ',
  'CAACAgIAAxkBAAIMgWLDXjMVr_BAuZR_nUQIMKwswiScAALPAQACPQ3oBOq1YbIcdrpBKQQ',
  'CAACAgIAAxkBAAIMg2LDXjq2VYi_IzAHFfWpHeoqk9TdAALRAQACPQ3oBPCyBQkFuchBKQQ',
  'CAACAgIAAxkBAAIMhWLDXkgnbpzFJpVVHftJRF6fpbZQAALSAQACPQ3oBKjp5HArmLWkKQQ',
  'CAACAgIAAxkBAAIMh2LDXlERcSGu4Baxle-dopXzd-orAALcAQACPQ3oBICtXNrgvru7KQQ',
  'CAACAgIAAxkBAAIMiWLDXlnSFjOnWsnWvm76yUT6RRlmAAJkAQACPQ3oBEGiWtbfacslKQQ',
  'CAACAgIAAxkBAAIMi2LDXmBjd6MKG-kgqgYN_otPo_FbAALaAQACPQ3oBNsxsT2ikK1EKQQ',
  'CAACAgIAAxkBAAIMjWLDXmowx5-9ZN8Gzj-Ez23sZKsKAAKjEgACqnkgSw14_DlLut12KQQ',
  'CAACAgIAAxkBAAIMj2LDXnCypC-n3XUQhR8vLKSs7F3rAAIYAgACPQ3oBJNzRRBs0e2EKQQ',
  'CAACAgIAAxkBAAIMkWLDXnatRznIjJ-JSJB32skD98TrAAJ1AQACPQ3oBEkHbkq-4YzCKQQ',
  'CAACAgIAAxkBAAIMk2LDXn7F-R8qiM7QDxxICokfU0GHAAJ7AQACPQ3oBPsgbkxf4HM8KQQ',
  'CAACAgIAAxkBAAIMlWLDXoXPfsIsz3g5r_gsgw15SECAAAKBAQACPQ3oBLnOfh48iQp_KQQ',
  'CAACAgIAAxkBAAIMl2LDXozUwq_R1PXP7nzliTSsL8wqAAJxAQACPQ3oBAABqhpXPuJa7ikE',
  'CAACAgIAAxkBAAIMmWLDXpI34S1v_SJjyRgmrev0AjwpAAK8AQACPQ3oBJBamUlVUaclKQQ',
  'CAACAgIAAxkBAAIMm2LDXpvDjj0Ufann9Vuy52D7sUlcAAKZAQACPQ3oBGKkXWkgx0-uKQQ',
  'CAACAgIAAxkBAAIMnWLDXqLk0JOlKHA8D9AccfzjfYXBAALdAQACPQ3oBFUlsSoCYsBhKQQ',
  'CAACAgIAAxkBAAIMn2LDXqkGa1dK7PQgd3AJgHujxtD3AAJ9AQACPQ3oBNLcd9pLkjk0KQQ',
  'CAACAgIAAxkBAAIMoWLDXq9q8E1suAmHi6Lthj7EnBVuAALKAQACPQ3oBG3o1UNRSDDSKQQ',
  'CAACAgIAAxkBAAIMo2LDXrcdLM_ap9ObRjff5MxgSOCeAAIVAgACPQ3oBMMq3u2PiYE-KQQ',
  'CAACAgIAAxkBAAIMpWLDXr6thHT9SHGYX7E8bJJmYDt8AALOAQACPQ3oBM28-iDZHxfzKQQ',
  'CAACAgIAAxkBAAIMp2LDXsfZGeHJaGzWqCV8zOtXfBqRAALMAQACPQ3oBMBrXcbV0L2fKQQ',
  'CAACAgIAAxkBAAIMqWLDXs3aRdElD2lusmIZEkD82brIAAJbAQACPQ3oBCzzxHoKz5YEKQQ',
  'CAACAgIAAxkBAAIMq2LDXtNHyCMPpFJmsTR_fCxOHwv_AAJeAQACPQ3oBAaIJIYJMJDLKQQ',
  'CAACAgIAAxkBAAIMrWLDXtocDdtpYXQovvCETb4fLZ86AAJnAQACPQ3oBG34I0o6RZMGKQQ',
  'CAACAgIAAxkBAAIMr2LDXuBbzBlmDOWby_2imFFoMOmyAAJ_EAAC-VZgS5YaUypWFf_HKQQ',
]
