/*
  Warnings:

  - You are about to drop the column `sendBytes` on the `WireguardPeer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WireguardPeer" DROP COLUMN "sendBytes",
ADD COLUMN     "sendBytes" INTEGER NOT NULL DEFAULT 0;
