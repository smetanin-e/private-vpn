-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "accessTokenHash" DROP NOT NULL,
ALTER COLUMN "accessTokenId" DROP NOT NULL;
