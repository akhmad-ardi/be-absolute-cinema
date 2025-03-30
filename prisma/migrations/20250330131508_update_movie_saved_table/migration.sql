/*
  Warnings:

  - The primary key for the `MovieSaved` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `MovieSaved` table. All the data in the column will be lost.
  - Added the required column `movie_id` to the `MovieSaved` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MovieSaved" DROP CONSTRAINT "MovieSaved_pkey",
DROP COLUMN "id",
ADD COLUMN     "movie_id" INTEGER NOT NULL,
ADD CONSTRAINT "MovieSaved_pkey" PRIMARY KEY ("movie_id");
