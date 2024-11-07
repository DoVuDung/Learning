/*
  Warnings:

  - You are about to drop the column `fulltext` on the `film` table. All the data in the column will be lost.
  - You are about to alter the column `description` on the `film` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - The `special_features` column on the `film` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "film" DROP CONSTRAINT "film_language_id_fkey";

-- DropIndex
DROP INDEX "film_fulltext_idx";

-- AlterTable
ALTER TABLE "film" DROP COLUMN "fulltext",
ALTER COLUMN "title" SET DEFAULT '',
ALTER COLUMN "description" SET DEFAULT '',
ALTER COLUMN "description" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "release_year" SET DEFAULT 0,
ALTER COLUMN "language_id" DROP NOT NULL,
DROP COLUMN "special_features",
ADD COLUMN     "special_features" JSON;

-- AddForeignKey
ALTER TABLE "film" ADD CONSTRAINT "film_language_id_fkey" FOREIGN KEY ("language_id") REFERENCES "language"("language_id") ON DELETE SET NULL ON UPDATE CASCADE;
