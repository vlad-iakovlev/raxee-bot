-- CreateEnum
CREATE TYPE "POKER_ROUND" AS ENUM ('PREFLOP', 'FLOP', 'TURN', 'RIVER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "tgUserId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT,
    "username" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokerPlayer" (
    "id" TEXT NOT NULL,
    "cards" INTEGER[],
    "balance" INTEGER NOT NULL,
    "betAmount" INTEGER NOT NULL,
    "hasFolded" BOOLEAN NOT NULL,
    "hasLost" BOOLEAN NOT NULL,
    "hasTurned" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,

    CONSTRAINT "PokerPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PokerState" (
    "id" TEXT NOT NULL,
    "tgChatId" TEXT NOT NULL,
    "cards" INTEGER[],
    "round" "POKER_ROUND" NOT NULL,
    "dealsCount" INTEGER NOT NULL,
    "dealerIndex" INTEGER NOT NULL,
    "currentPlayerIndex" INTEGER NOT NULL,

    CONSTRAINT "PokerState_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PumpkinPlayer" (
    "id" TEXT NOT NULL,
    "tgChatId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "PumpkinPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PumpkinStats" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "playerId" TEXT NOT NULL,

    CONSTRAINT "PumpkinStats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PumpkinStrings" (
    "id" TEXT NOT NULL,
    "tgChatIds" TEXT[],
    "hello" TEXT[],
    "notEnoughPlayers" TEXT[],
    "earlyWinner" TEXT[],
    "newWinner1" TEXT[],
    "newWinner2" TEXT[],
    "newWinner3" TEXT[],
    "newWinner4" TEXT[],
    "newWinnerNewYear" TEXT[],
    "pumpkinOfYear" TEXT[],
    "replyForWinner" TEXT[],
    "statsTitleAllTime" TEXT[],
    "statsTitleYear" TEXT[],
    "statsPlayer" TEXT[],
    "statsTotalPlayers" TEXT[],

    CONSTRAINT "PumpkinStrings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_tgUserId_key" ON "User"("tgUserId");

-- CreateIndex
CREATE UNIQUE INDEX "PokerPlayer_userId_key" ON "PokerPlayer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PokerState_tgChatId_key" ON "PokerState"("tgChatId");

-- CreateIndex
CREATE UNIQUE INDEX "PumpkinPlayer_tgChatId_userId_key" ON "PumpkinPlayer"("tgChatId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "PumpkinStats_playerId_date_key" ON "PumpkinStats"("playerId", "date");

-- AddForeignKey
ALTER TABLE "PokerPlayer" ADD CONSTRAINT "PokerPlayer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PokerPlayer" ADD CONSTRAINT "PokerPlayer_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "PokerState"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PumpkinPlayer" ADD CONSTRAINT "PumpkinPlayer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PumpkinStats" ADD CONSTRAINT "PumpkinStats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "PumpkinPlayer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
