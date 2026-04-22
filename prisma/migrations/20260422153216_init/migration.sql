/*
  Warnings:

  - You are about to drop the column `is_free` on the `Client` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Client" DROP COLUMN "is_free",
ADD COLUMN     "isFree" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "tariff" INTEGER NOT NULL DEFAULT 0;
