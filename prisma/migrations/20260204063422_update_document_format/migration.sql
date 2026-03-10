/*
  Warnings:

  - You are about to drop the column `use_day` on the `document_format` table. All the data in the column will be lost.
  - You are about to drop the column `use_month` on the `document_format` table. All the data in the column will be lost.
  - You are about to drop the column `use_year` on the `document_format` table. All the data in the column will be lost.
  - Added the required column `pattern` to the `document_format` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "document_format" DROP COLUMN "use_day",
DROP COLUMN "use_month",
DROP COLUMN "use_year",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "pattern" TEXT NOT NULL;
