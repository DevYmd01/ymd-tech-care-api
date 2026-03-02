/*
  Warnings:

  - You are about to drop the column `branch_id` on the `vq_header` table. All the data in the column will be lost.
  - You are about to drop the column `budget_id` on the `vq_header` table. All the data in the column will be lost.
  - You are about to drop the column `cost_center_id` on the `vq_header` table. All the data in the column will be lost.
  - You are about to drop the column `currency_code` on the `vq_header` table. All the data in the column will be lost.
  - You are about to drop the column `gl_account_id` on the `vq_header` table. All the data in the column will be lost.
  - You are about to drop the column `incoterm` on the `vq_header` table. All the data in the column will be lost.
  - You are about to drop the column `payment_term_hint` on the `vq_header` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `vq_header` table. All the data in the column will be lost.
  - You are about to drop the column `quotation_due_date` on the `vq_header` table. All the data in the column will be lost.
  - You are about to drop the column `receive_location` on the `vq_header` table. All the data in the column will be lost.
  - You are about to drop the column `remarks` on the `vq_header` table. All the data in the column will be lost.
  - You are about to drop the column `requested_by` on the `vq_header` table. All the data in the column will be lost.
  - You are about to alter the column `exchange_rate` on the `vq_header` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,2)` to `Decimal(18,6)`.
  - You are about to drop the column `budget_id` on the `vq_line` table. All the data in the column will be lost.
  - You are about to drop the column `cost_center_id` on the `vq_line` table. All the data in the column will be lost.
  - You are about to drop the column `currency_code` on the `vq_line` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `vq_line` table. All the data in the column will be lost.
  - You are about to drop the column `exchange_rate` on the `vq_line` table. All the data in the column will be lost.
  - You are about to drop the column `gl_account_id` on the `vq_line` table. All the data in the column will be lost.
  - You are about to drop the column `incoterm` on the `vq_line` table. All the data in the column will be lost.
  - You are about to drop the column `payment_term_hint` on the `vq_line` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `vq_line` table. All the data in the column will be lost.
  - You are about to drop the column `receive_location` on the `vq_line` table. All the data in the column will be lost.
  - You are about to drop the column `remarks` on the `vq_line` table. All the data in the column will be lost.
  - You are about to drop the column `requested_by` on the `vq_line` table. All the data in the column will be lost.
  - You are about to drop the column `rfq_id` on the `vq_line` table. All the data in the column will be lost.
  - You are about to drop the column `vendor_id` on the `vq_line` table. All the data in the column will be lost.
  - Added the required column `base_total_amount` to the `vq_header` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quote_total_amount` to the `vq_header` table without a default value. This is not possible if the table is not empty.
  - Added the required column `net_amount` to the `vq_line` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qty` to the `vq_line` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_price` to the `vq_line` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uom_id` to the `vq_line` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "vq_header" DROP CONSTRAINT "vq_header_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "vq_header" DROP CONSTRAINT "vq_header_cost_center_id_fkey";

-- DropForeignKey
ALTER TABLE "vq_header" DROP CONSTRAINT "vq_header_project_id_fkey";

-- DropForeignKey
ALTER TABLE "vq_line" DROP CONSTRAINT "vq_line_vendor_id_fkey";

-- AlterTable
ALTER TABLE "vq_header" DROP COLUMN "branch_id",
DROP COLUMN "budget_id",
DROP COLUMN "cost_center_id",
DROP COLUMN "currency_code",
DROP COLUMN "gl_account_id",
DROP COLUMN "incoterm",
DROP COLUMN "payment_term_hint",
DROP COLUMN "project_id",
DROP COLUMN "quotation_due_date",
DROP COLUMN "receive_location",
DROP COLUMN "remarks",
DROP COLUMN "requested_by",
ADD COLUMN     "base_currency_code" VARCHAR(3),
ADD COLUMN     "base_discount_amount" DECIMAL(18,2),
ADD COLUMN     "base_tax_amount" DECIMAL(18,2),
ADD COLUMN     "base_total_amount" DECIMAL(18,2) NOT NULL,
ADD COLUMN     "discount_expression" VARCHAR(20),
ADD COLUMN     "discount_rate" DECIMAL(9,4),
ADD COLUMN     "exchange_rate_date" TIMESTAMP(3),
ADD COLUMN     "lead_time_days" INTEGER,
ADD COLUMN     "payment_term_days" INTEGER,
ADD COLUMN     "quotation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "quotation_expiry_date" TIMESTAMP(3),
ADD COLUMN     "quotation_no" VARCHAR(30),
ADD COLUMN     "quote_currency_code" VARCHAR(3),
ADD COLUMN     "quote_discount_amount" DECIMAL(18,2),
ADD COLUMN     "quote_tax_amount" DECIMAL(18,2),
ADD COLUMN     "quote_total_amount" DECIMAL(18,2) NOT NULL,
ADD COLUMN     "tax_code_id" INTEGER,
ADD COLUMN     "tax_rate" DECIMAL(9,4),
ALTER COLUMN "exchange_rate" DROP NOT NULL,
ALTER COLUMN "exchange_rate" SET DATA TYPE DECIMAL(18,6);

-- AlterTable
ALTER TABLE "vq_line" DROP COLUMN "budget_id",
DROP COLUMN "cost_center_id",
DROP COLUMN "currency_code",
DROP COLUMN "description",
DROP COLUMN "exchange_rate",
DROP COLUMN "gl_account_id",
DROP COLUMN "incoterm",
DROP COLUMN "payment_term_hint",
DROP COLUMN "project_id",
DROP COLUMN "receive_location",
DROP COLUMN "remarks",
DROP COLUMN "requested_by",
DROP COLUMN "rfq_id",
DROP COLUMN "vendor_id",
ADD COLUMN     "discount_amount" DECIMAL(18,2),
ADD COLUMN     "net_amount" DECIMAL(18,2) NOT NULL,
ADD COLUMN     "qty" DECIMAL(18,6) NOT NULL,
ADD COLUMN     "tax_code" INTEGER,
ADD COLUMN     "tax_code_id" INTEGER,
ADD COLUMN     "tax_rate" DECIMAL(9,4),
ADD COLUMN     "unit_price" DECIMAL(18,2) NOT NULL,
ADD COLUMN     "uom_id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "tax_code_tax_group_id_idx" ON "tax_code"("tax_group_id");

-- AddForeignKey
ALTER TABLE "vq_header" ADD CONSTRAINT "vq_header_tax_code_id_fkey" FOREIGN KEY ("tax_code_id") REFERENCES "tax_code"("tax_code_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vq_line" ADD CONSTRAINT "vq_line_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "uom"("uom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vq_line" ADD CONSTRAINT "vq_line_tax_code_id_fkey" FOREIGN KEY ("tax_code_id") REFERENCES "tax_code"("tax_code_id") ON DELETE SET NULL ON UPDATE CASCADE;
