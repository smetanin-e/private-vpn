/*
  Warnings:

  - You are about to drop the column `ownerId` on the `BalanceTransaction` table. All the data in the column will be lost.
  - You are about to drop the column `configOwnerId` on the `WireguardPeer` table. All the data in the column will be lost.
  - You are about to drop the `ConfigOwner` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[clientId]` on the table `WireguardPeer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clientId` to the `BalanceTransaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientId` to the `WireguardPeer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "BalanceTransaction" DROP CONSTRAINT "BalanceTransaction_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "WireguardPeer" DROP CONSTRAINT "WireguardPeer_configOwnerId_fkey";

-- DropIndex
DROP INDEX "WireguardPeer_configOwnerId_key";

-- AlterTable
ALTER TABLE "BalanceTransaction" DROP COLUMN "ownerId",
ADD COLUMN     "clientId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "WireguardPeer" DROP COLUMN "configOwnerId",
ADD COLUMN     "clientId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "ConfigOwner";

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "is_free" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WireguardPeer_clientId_key" ON "WireguardPeer"("clientId");

-- AddForeignKey
ALTER TABLE "WireguardPeer" ADD CONSTRAINT "WireguardPeer_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalanceTransaction" ADD CONSTRAINT "BalanceTransaction_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
