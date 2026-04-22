-- AlterTable
ALTER TABLE "WireguardPeer" ADD COLUMN     "receivedBytes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "sentBytes" INTEGER NOT NULL DEFAULT 0;
