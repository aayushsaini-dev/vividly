/*
  Warnings:

  - You are about to drop the column `compressedSized` on the `Video` table. All the data in the column will be lost.
  - You are about to drop the column `orignalSize` on the `Video` table. All the data in the column will be lost.
  - Added the required column `compressedSize` to the `Video` table without a default value. This is not possible if the table is not empty.
  - Added the required column `originalSize` to the `Video` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Video" DROP COLUMN "compressedSized",
DROP COLUMN "orignalSize",
ADD COLUMN     "compressedSize" INTEGER NOT NULL,
ADD COLUMN     "originalSize" INTEGER NOT NULL;
