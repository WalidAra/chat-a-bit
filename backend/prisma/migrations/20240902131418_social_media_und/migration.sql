/*
  Warnings:

  - Made the column `url` on table `SocialMediaLinks` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SocialMediaLinks" ALTER COLUMN "url" SET NOT NULL;
