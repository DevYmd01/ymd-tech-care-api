/*
  Warnings:

  - You are about to drop the column `cost_center_id` on the `rfq_header` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `rfq_header` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "rfq_header" DROP CONSTRAINT "rfq_header_cost_center_id_fkey";

-- DropForeignKey
ALTER TABLE "rfq_header" DROP CONSTRAINT "rfq_header_project_id_fkey";

-- AlterTable
ALTER TABLE "rfq_header" DROP COLUMN "cost_center_id",
DROP COLUMN "project_id";

-- CreateTable
CREATE TABLE "po_header" (
    "po_header_id" SERIAL NOT NULL,
    "po_no" VARCHAR(30) NOT NULL,
    "po_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "pr_id" INTEGER NOT NULL,
    "vendor_id" INTEGER NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "warehouse_id" INTEGER,
    "status" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "base_currency_code" VARCHAR(3),
    "quote_currency_code" VARCHAR(3),
    "exchange_rate" DECIMAL(18,6),
    "exchange_rate_date" TIMESTAMP(3),
    "base_total_amount" DECIMAL(18,2) NOT NULL,
    "quote_total_amount" DECIMAL(18,2) NOT NULL,
    "tax_code_id" INTEGER,
    "tax_rate" DECIMAL(9,4),
    "base_tax_amount" DECIMAL(18,2),
    "quote_tax_amount" DECIMAL(18,2),
    "discount_expression" VARCHAR(20),
    "discount_rate" DECIMAL(9,4),
    "base_discount_amount" DECIMAL(18,2),
    "quote_discount_amount" DECIMAL(18,2),

    CONSTRAINT "po_header_pkey" PRIMARY KEY ("po_header_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "po_header_po_no_key" ON "po_header"("po_no");

-- AddForeignKey
ALTER TABLE "po_header" ADD CONSTRAINT "po_header_pr_id_fkey" FOREIGN KEY ("pr_id") REFERENCES "pr_header"("pr_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_header" ADD CONSTRAINT "po_header_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_header" ADD CONSTRAINT "po_header_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_header" ADD CONSTRAINT "po_header_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_header" ADD CONSTRAINT "po_header_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_header" ADD CONSTRAINT "po_header_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("warehouse_id") ON DELETE SET NULL ON UPDATE CASCADE;
