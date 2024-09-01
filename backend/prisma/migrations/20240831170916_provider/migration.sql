-- CreateEnum
CREATE TYPE "Provider" AS ENUM ('DIRECT', 'GOOGLE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "provider" "Provider" NOT NULL DEFAULT 'DIRECT';
