/*
  Warnings:

  - A unique constraint covering the columns `[hastag]` on the table `Hashtag` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Hashtag.hastag_unique" ON "Hashtag"("hastag");
