/*
  Warnings:

  - You are about to drop the column `order_currency_code` on the `sale_order_approval_header` table. All the data in the column will be lost.
  - You are about to drop the column `order_discount_amount` on the `sale_order_approval_header` table. All the data in the column will be lost.
  - You are about to drop the column `order_tax_amount` on the `sale_order_approval_header` table. All the data in the column will be lost.
  - You are about to drop the column `order_total_amount` on the `sale_order_approval_header` table. All the data in the column will be lost.
  - You are about to alter the column `tax_rate` on the `sale_order_approval_header` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,6)` to `Decimal(9,4)`.
  - You are about to alter the column `base_tax_amount` on the `sale_order_approval_header` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,6)` to `Decimal(18,2)`.
  - You are about to alter the column `discount_rate` on the `sale_order_approval_header` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,6)` to `Decimal(9,4)`.
  - You are about to alter the column `base_discount_amount` on the `sale_order_approval_header` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,6)` to `Decimal(18,2)`.
  - Added the required column `quote_total_amount` to the `sale_order_approval_header` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sale_order_approval_header" DROP COLUMN "order_currency_code",
DROP COLUMN "order_discount_amount",
DROP COLUMN "order_tax_amount",
DROP COLUMN "order_total_amount",
ADD COLUMN     "quote_currency_code" VARCHAR(3),
ADD COLUMN     "quote_discount_amount" DECIMAL(18,2),
ADD COLUMN     "quote_tax_amount" DECIMAL(18,2),
ADD COLUMN     "quote_total_amount" DECIMAL(18,2) NOT NULL,
ALTER COLUMN "tax_rate" SET DATA TYPE DECIMAL(9,4),
ALTER COLUMN "base_tax_amount" SET DATA TYPE DECIMAL(18,2),
ALTER COLUMN "discount_rate" SET DATA TYPE DECIMAL(9,4),
ALTER COLUMN "base_discount_amount" SET DATA TYPE DECIMAL(18,2);
