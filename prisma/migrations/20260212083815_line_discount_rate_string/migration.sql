/*
  Warnings:

  - You are about to alter the column `pr_discount_rate` on the `pr_header` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,4)` to `VarChar(10)`.

*/
-- AlterTable
ALTER TABLE "pr_header" ALTER COLUMN "pr_discount_rate" SET DATA TYPE VARCHAR(10);
