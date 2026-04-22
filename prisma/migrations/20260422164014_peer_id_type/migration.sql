/*
  Warnings:

  - Changed the type of `wgPeerId` on the `WireguardPeer` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "WireguardPeer" DROP COLUMN "wgPeerId",
ADD COLUMN     "wgPeerId" INTEGER NOT NULL;
