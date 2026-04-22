/*
  Warnings:

  - Added the required column `wgPeerId` to the `WireguardPeer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WireguardPeer" ADD COLUMN     "wgPeerId" TEXT NOT NULL;
