-- CreateEnum
CREATE TYPE "WgPeerStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('TOP_UP', 'DAILY_CHARGE');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "login" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WireguardServer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "baseUrl" TEXT NOT NULL,
    "apiToken" TEXT NOT NULL,

    CONSTRAINT "WireguardServer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WireguardPeer" (
    "id" SERIAL NOT NULL,
    "wgPeerId" INTEGER NOT NULL,
    "peerName" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "status" "WgPeerStatus" NOT NULL DEFAULT 'ACTIVE',
    "lastActivity" TIMESTAMP(3),
    "receivedBytes" INTEGER NOT NULL DEFAULT 0,
    "sendBytes" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "clientId" INTEGER NOT NULL,
    "wireguardServerId" INTEGER NOT NULL,

    CONSTRAINT "WireguardPeer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Client" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "isFree" BOOLEAN NOT NULL DEFAULT false,
    "tariff" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accessTokenId" TEXT,
    "accessTokenHash" TEXT,

    CONSTRAINT "Client_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BalanceTransaction" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" "TransactionType" NOT NULL,
    "clientId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BalanceTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PeerMonthlyStats" (
    "id" SERIAL NOT NULL,
    "month" TIMESTAMP(3) NOT NULL,
    "peerId" INTEGER NOT NULL,
    "receivedBytes" BIGINT NOT NULL,
    "sendBytes" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PeerMonthlyStats_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "WireguardServer_name_key" ON "WireguardServer"("name");

-- CreateIndex
CREATE UNIQUE INDEX "WireguardPeer_clientId_key" ON "WireguardPeer"("clientId");

-- CreateIndex
CREATE UNIQUE INDEX "WireguardPeer_wireguardServerId_wgPeerId_key" ON "WireguardPeer"("wireguardServerId", "wgPeerId");

-- CreateIndex
CREATE UNIQUE INDEX "Client_accessTokenId_key" ON "Client"("accessTokenId");

-- AddForeignKey
ALTER TABLE "WireguardPeer" ADD CONSTRAINT "WireguardPeer_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WireguardPeer" ADD CONSTRAINT "WireguardPeer_wireguardServerId_fkey" FOREIGN KEY ("wireguardServerId") REFERENCES "WireguardServer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalanceTransaction" ADD CONSTRAINT "BalanceTransaction_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PeerMonthlyStats" ADD CONSTRAINT "PeerMonthlyStats_peerId_fkey" FOREIGN KEY ("peerId") REFERENCES "WireguardPeer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
