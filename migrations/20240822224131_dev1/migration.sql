/*
  Warnings:

  - You are about to drop the column `name` on the `Uploads` table. All the data in the column will be lost.
  - You are about to drop the column `uploaded` on the `Uploads` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Uploads` table. All the data in the column will be lost.
  - Added the required column `filename` to the `Uploads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalName` to the `Uploads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `path` to the `Uploads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uploaderId` to the `Uploads` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Uploads" DROP CONSTRAINT "Uploads_userId_fkey";

-- AlterTable
ALTER TABLE "Uploads" DROP COLUMN "name",
DROP COLUMN "uploaded",
DROP COLUMN "userId",
ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "originalName" TEXT NOT NULL,
ADD COLUMN     "path" TEXT NOT NULL,
ADD COLUMN     "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "uploaderId" TEXT NOT NULL,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Users" ALTER COLUMN "id" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Uploads" ADD CONSTRAINT "Uploads_uploaderId_fkey" FOREIGN KEY ("uploaderId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
