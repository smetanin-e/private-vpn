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
CREATE TABLE "WireguardPeer" (
    "id" SERIAL NOT NULL,
    "peerName" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "status" "WgPeerStatus" NOT NULL DEFAULT 'ACTIVE',
    "lastActivity" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "configOwnerId" INTEGER NOT NULL,

    CONSTRAINT "WireguardPeer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConfigOwner" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "balance" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConfigOwner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BalanceTransaction" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" "TransactionType" NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BalanceTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_login_key" ON "User"("login");

-- CreateIndex
CREATE UNIQUE INDEX "WireguardPeer_configOwnerId_key" ON "WireguardPeer"("configOwnerId");

-- AddForeignKey
ALTER TABLE "WireguardPeer" ADD CONSTRAINT "WireguardPeer_configOwnerId_fkey" FOREIGN KEY ("configOwnerId") REFERENCES "ConfigOwner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BalanceTransaction" ADD CONSTRAINT "BalanceTransaction_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "ConfigOwner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
