-- AlterTable
ALTER TABLE "items" ADD COLUMN     "priceId" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "token" TEXT;
