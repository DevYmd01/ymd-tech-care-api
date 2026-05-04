/*
  Warnings:

  - You are about to alter the column `unit_price` on the `sale_order_approval_line` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,2)` to `Decimal(18,6)`.

*/
-- AlterTable
ALTER TABLE "sale_order_approval_line" ALTER COLUMN "unit_price" SET DATA TYPE DECIMAL(18,6);
