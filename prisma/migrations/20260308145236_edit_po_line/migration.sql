/*
  Warnings:

  - You are about to drop the column `base_currency_code` on the `po_line` table. All the data in the column will be lost.
  - You are about to drop the column `base_discount_amount` on the `po_line` table. All the data in the column will be lost.
  - You are about to drop the column `base_tax_amount` on the `po_line` table. All the data in the column will be lost.
  - You are about to drop the column `base_total_amount` on the `po_line` table. All the data in the column will be lost.
  - You are about to drop the column `branch_id` on the `po_line` table. All the data in the column will be lost.
  - You are about to drop the column `created_by` on the `po_line` table. All the data in the column will be lost.
  - You are about to drop the column `exchange_rate` on the `po_line` table. All the data in the column will be lost.
  - You are about to drop the column `exchange_rate_date` on the `po_line` table. All the data in the column will be lost.
  - You are about to drop the column `quote_currency_code` on the `po_line` table. All the data in the column will be lost.
  - You are about to drop the column `quote_discount_amount` on the `po_line` table. All the data in the column will be lost.
  - You are about to drop the column `quote_tax_amount` on the `po_line` table. All the data in the column will be lost.
  - You are about to drop the column `quote_total_amount` on the `po_line` table. All the data in the column will be lost.
  - You are about to drop the column `updated_by` on the `po_line` table. All the data in the column will be lost.
  - You are about to drop the column `vendor_id` on the `po_line` table. All the data in the column will be lost.
  - You are about to drop the column `warehouse_id` on the `po_line` table. All the data in the column will be lost.
  - Added the required column `line_total_amount` to the `po_line` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "po_line" DROP CONSTRAINT "po_line_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "po_line" DROP CONSTRAINT "po_line_created_by_fkey";

-- DropForeignKey
ALTER TABLE "po_line" DROP CONSTRAINT "po_line_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "po_line" DROP CONSTRAINT "po_line_vendor_id_fkey";

-- DropForeignKey
ALTER TABLE "po_line" DROP CONSTRAINT "po_line_warehouse_id_fkey";

-- AlterTable
ALTER TABLE "po_line" DROP COLUMN "base_currency_code",
DROP COLUMN "base_discount_amount",
DROP COLUMN "base_tax_amount",
DROP COLUMN "base_total_amount",
DROP COLUMN "branch_id",
DROP COLUMN "created_by",
DROP COLUMN "exchange_rate",
DROP COLUMN "exchange_rate_date",
DROP COLUMN "quote_currency_code",
DROP COLUMN "quote_discount_amount",
DROP COLUMN "quote_tax_amount",
DROP COLUMN "quote_total_amount",
DROP COLUMN "updated_by",
DROP COLUMN "vendor_id",
DROP COLUMN "warehouse_id",
ADD COLUMN     "line_total_amount" DECIMAL(18,2) NOT NULL;

-- AddForeignKey
ALTER TABLE "po_line" ADD CONSTRAINT "po_line_po_header_id_fkey" FOREIGN KEY ("po_header_id") REFERENCES "po_header"("po_header_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_line" ADD CONSTRAINT "po_line_pr_line_id_fkey" FOREIGN KEY ("pr_line_id") REFERENCES "pr_line"("pr_line_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_line" ADD CONSTRAINT "po_line_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "uom"("uom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_line" ADD CONSTRAINT "po_line_tax_code_id_fkey" FOREIGN KEY ("tax_code_id") REFERENCES "tax_code"("tax_code_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_line" ADD CONSTRAINT "po_line_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("item_id") ON DELETE SET NULL ON UPDATE CASCADE;
