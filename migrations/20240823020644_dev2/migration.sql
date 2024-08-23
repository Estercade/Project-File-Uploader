/*
  Warnings:

  - You are about to drop the column `originalName` on the `Uploads` table. All the data in the column will be lost.
  - You are about to drop the column `path` on the `Uploads` table. All the data in the column will be lost.
  - Added the required column `url` to the `Uploads` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Uploads" DROP COLUMN "originalName",
DROP COLUMN "path",
ADD COLUMN     "url" TEXT NOT NULL;
