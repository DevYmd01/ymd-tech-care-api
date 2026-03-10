/*
  Warnings:

  - A unique constraint covering the columns `[tax_group_code]` on the table `tax_group` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "tax_group" ALTER COLUMN "description" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "tax_group_tax_group_code_key" ON "tax_group"("tax_group_code");
