/*
  Warnings:

  - You are about to drop the column `lastActivity` on the `WireguardPeer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WireguardPeer" DROP COLUMN "lastActivity";
