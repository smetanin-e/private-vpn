/*
  Warnings:

  - Added the required column `description` to the `BalanceTransaction` table without a default value. This is not possible if the table is not empty.
  - Made the column `wireguardServerId` on table `WireguardPeer` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "WireguardPeer" DROP CONSTRAINT "WireguardPeer_wireguardServerId_fkey";

-- AlterTable
ALTER TABLE "BalanceTransaction" ADD COLUMN     "description" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "WireguardPeer" ALTER COLUMN "wireguardServerId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "WireguardPeer" ADD CONSTRAINT "WireguardPeer_wireguardServerId_fkey" FOREIGN KEY ("wireguardServerId") REFERENCES "WireguardServer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
