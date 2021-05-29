/*
  Warnings:

  - You are about to drop the column `hastag` on the `Hashtag` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hashtag]` on the table `Hashtag` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hashtag` to the `Hashtag` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Hashtag.hastag_unique";

-- AlterTable
ALTER TABLE "Hashtag" DROP COLUMN "hastag",
ADD COLUMN     "hashtag" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Hashtag.hashtag_unique" ON "Hashtag"("hashtag");
