/*
  Warnings:

  - You are about to drop the `PendingRequests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PendingRequests" DROP CONSTRAINT "PendingRequests_clientId_fkey";

-- DropForeignKey
ALTER TABLE "PendingRequests" DROP CONSTRAINT "PendingRequests_userId_fkey";

-- DropTable
DROP TABLE "PendingRequests";
