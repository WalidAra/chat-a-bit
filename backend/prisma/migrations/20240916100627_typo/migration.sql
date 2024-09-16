/*
  Warnings:

  - You are about to drop the column `descreption` on the `Chat` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clientId,userId]` on the table `Blocked` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clientId,userId]` on the table `Friend` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clientId,userId]` on the table `FriendRequests` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[clientId,userId]` on the table `PendingRequests` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "descreption",
ADD COLUMN     "description" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Blocked_clientId_userId_key" ON "Blocked"("clientId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Friend_clientId_userId_key" ON "Friend"("clientId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "FriendRequests_clientId_userId_key" ON "FriendRequests"("clientId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "PendingRequests_clientId_userId_key" ON "PendingRequests"("clientId", "userId");
