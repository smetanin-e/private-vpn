/*
  Warnings:

  - A unique constraint covering the columns `[accessTokenId]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accessTokenHash` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `accessTokenId` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "accessTokenHash" TEXT NOT NULL,
ADD COLUMN     "accessTokenId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Client_accessTokenId_key" ON "Client"("accessTokenId");
