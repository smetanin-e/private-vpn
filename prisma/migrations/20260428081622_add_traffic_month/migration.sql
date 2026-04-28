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

-- AddForeignKey
ALTER TABLE "PeerMonthlyStats" ADD CONSTRAINT "PeerMonthlyStats_peerId_fkey" FOREIGN KEY ("peerId") REFERENCES "WireguardPeer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
