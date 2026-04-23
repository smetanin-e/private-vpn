/*
  Warnings:

  - A unique constraint covering the columns `[wireguardServerId,wgPeerId]` on the table `WireguardPeer` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "WireguardPeer" ADD COLUMN     "wireguardServerId" INTEGER;

-- CreateTable
CREATE TABLE "WireguardServer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "baseUrl" TEXT NOT NULL,
    "apiToken" TEXT NOT NULL,

    CONSTRAINT "WireguardServer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WireguardServer_name_key" ON "WireguardServer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "WireguardPeer_wireguardServerId_wgPeerId_key" ON "WireguardPeer"("wireguardServerId", "wgPeerId");

-- AddForeignKey
ALTER TABLE "WireguardPeer" ADD CONSTRAINT "WireguardPeer_wireguardServerId_fkey" FOREIGN KEY ("wireguardServerId") REFERENCES "WireguardServer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
