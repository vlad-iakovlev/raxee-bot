-- AlterTable
UPDATE "PokerPlayer" SET "updatedAt" = "createdAt" WHERE "updatedAt" IS NULL;
ALTER TABLE "PokerPlayer" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
UPDATE "PokerState" SET "updatedAt" = "createdAt" WHERE "updatedAt" IS NULL;
ALTER TABLE "PokerState" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
UPDATE "PumpkinPlayer" SET "updatedAt" = "createdAt" WHERE "updatedAt" IS NULL;
ALTER TABLE "PumpkinPlayer" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
UPDATE "PumpkinStats" SET "updatedAt" = "createdAt" WHERE "updatedAt" IS NULL;
ALTER TABLE "PumpkinStats" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
UPDATE "User" SET "updatedAt" = "createdAt" WHERE "updatedAt" IS NULL;
ALTER TABLE "User" ALTER COLUMN "updatedAt" SET NOT NULL;
