import { User } from '@prisma/client'
import {
  CARD_SUIT,
  CARD_VALUE,
  COMBINATION_LEVEL,
  ERROR_CODE,
  Player,
} from '@vlad-yakovlev/poker'
import { md } from '@vlad-yakovlev/telegram-md'
import { getMention } from '../../utils/getMention.js'
import { getPokerCardString } from './utils/getPokerCardString.js'
import { getPokerCombinationString } from './utils/getPokerCombinationString.js'

export const STARTING_BALANCE = 1000
export const STARTING_BASE_BET_AMOUNT = 20

export const POKER_CARD_SUIT_NAMES = {
  [CARD_SUIT.CLUBS]: '♣️',
  [CARD_SUIT.DIAMONDS]: '♦️',
  [CARD_SUIT.HEARTS]: '♥️',
  [CARD_SUIT.SPADES]: '♠️',
} as const

export const POKER_CARD_VALUE_NAMES = {
  [CARD_VALUE.TWO]: '2',
  [CARD_VALUE.THREE]: '3',
  [CARD_VALUE.FOUR]: '4',
  [CARD_VALUE.FIVE]: '5',
  [CARD_VALUE.SIX]: '6',
  [CARD_VALUE.SEVEN]: '7',
  [CARD_VALUE.EIGHT]: '8',
  [CARD_VALUE.NINE]: '9',
  [CARD_VALUE.TEN]: '10',
  [CARD_VALUE.JACK]: 'J',
  [CARD_VALUE.QUEEN]: 'Q',
  [CARD_VALUE.KING]: 'K',
  [CARD_VALUE.ACE]: 'A',
} as const

export const POKER_COMBINATION_LEVEL_NAMES = {
  [COMBINATION_LEVEL.HIGH_CARD]: 'High Card',
  [COMBINATION_LEVEL.PAIR]: 'Pair',
  [COMBINATION_LEVEL.TWO_PAIR]: 'Two Pair',
  [COMBINATION_LEVEL.THREE_OF_KIND]: 'Three of a Kind',
  [COMBINATION_LEVEL.STRAIGHT]: 'Straight',
  [COMBINATION_LEVEL.FLUSH]: 'Flush',
  [COMBINATION_LEVEL.FULL_HOUSE]: 'Full House',
  [COMBINATION_LEVEL.FOUR_OF_KIND]: 'Four of a Kind',
  [COMBINATION_LEVEL.STRAIGHT_FLUSH]: 'Straight Flush',
  [COMBINATION_LEVEL.ROYAL_FLUSH]: 'Royal Flush',
} as const

export const STRINGS = {
  allIn: '💰 All in',
  amount: (value: number | string) => `${value} 🪙`,
  potAmount: (value: number | string) => `Pot: ${value} 🪙`,
  call: `✅ Call`,
  callAmount: (value: number | string) => `✅ ${value}`,
  raiseAmount: (value: number | string) => `⏫ ${value}`,
  check: '✊ Check',
  fold: '❌ Fold',
  preflop: 'Preflop',
  wonAmount: (value: number | string) => `🏆 ${value}`,
}

// prettier-ignore
export const MESSAGES = {
  _: {
    nextDeal: ({ players, dealer, smallBlind, bigBlind }: {
      players: Player<User>[]
      dealer: Player<User>
      smallBlind: Player<User>
      bigBlind: Player<User>
    }) =>
      md.join(
        [
          md.bold('Who is in the game:'),
          ...players.filter(player => !player.hasLost).map((player) =>
            md.join(
              [
                '\u2022',
                getMention(player.payload),
                `(${STRINGS.amount(player.balance + player.betAmount)})`,
                player.balance === 0 && STRINGS.allIn,
              ].filter(Boolean),
              ' '
            )
          ),
          '',
          md`${md.bold('Dealer:')} ${getMention(dealer.payload)}`,
          md`${md.bold('Small:')} ${getMention(smallBlind.payload)} (${STRINGS.amount(smallBlind.betAmount)})`,
          md`${md.bold('Big:')} ${getMention(bigBlind.payload)} (${STRINGS.amount(bigBlind.betAmount)})`,
        ],
        '\n'
      ),
    dealEnded: ({ tableCards, players }: {
      tableCards: number[]
      players: {
        player: Player<User>
        wonAmount: number
      }[]
    }) =>
      md.join(
        [
          `Table: ${tableCards.map(getPokerCardString).join(' ')}`,
          ...players.map(({ player, wonAmount }) =>
            md.join(
              [
                md`${getMention(player.payload)}: ${player.cards.map(getPokerCardString).join(' ')}`,
                [
                  player.bestCombination && getPokerCombinationString(player.bestCombination),
                  player.hasFolded && STRINGS.fold,
                  wonAmount && STRINGS.wonAmount(wonAmount),
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
    nextTurn: ({ player }: { player: Player<User> }) => md`${getMention(player.payload)}, your turn!`,
    gameEnded: 'Game over, folks!',
    playerMessage: (player: Player<User>, message: string) => md`${getMention(player.payload)}: ${message}`,
  },

  onMessage: {
    errors: {
      [ERROR_CODE.WRONG_TURN]: "This is not your turn, but I have shared your message with everyone",
      [ERROR_CODE.FOLD_NOT_ALLOWED]: 'Fold is not allowed',
      [ERROR_CODE.CHECK_NOT_ALLOWED]: 'Check is not allowed',
      [ERROR_CODE.CALL_NOT_ALLOWED]: 'Call is not allowed',
      [ERROR_CODE.RAISE_NOT_ALLOWED]: 'Raise is not allowed',
      [ERROR_CODE.RAISE_AMOUNT_TOO_SMALL]: 'The bet is too small',
      [ERROR_CODE.RAISE_AMOUNT_TOO_BIG]: 'The bet is too big',
      [ERROR_CODE.ALL_IN_NOT_ALLOWED]: 'All-in is not allowed',
    },
    unknownCommand: "I didn't understand you, but I shared your message with everyone",
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
    started: md`Go to the ${md.link('PM', 'https://t.me/raxee_bot')}, the game has started`,
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
