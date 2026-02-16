/*
  Warnings:

  - You are about to alter the column `est_unit_price` on the `pr_line` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,4)` to `Decimal(18,6)`.

*/
-- AlterTable
ALTER TABLE "cost_center" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "pr_line" ALTER COLUMN "est_unit_price" SET DATA TYPE DECIMAL(18,6);
