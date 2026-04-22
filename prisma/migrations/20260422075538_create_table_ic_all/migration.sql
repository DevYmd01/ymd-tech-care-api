/*
  Warnings:

  - You are about to drop the column `trasfer_cost_flag` on the `ic_option` table. All the data in the column will be lost.
  - The `check_deficit` column on the `ic_option` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `check_deficit_option` column on the `ic_option` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `check_qty_flag` column on the `ic_option` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `sale_reservation_header` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[item_id,lot_no]` on the table `item_lot` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `status` to the `item_lot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplier_vendor_id` to the `item_lot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `item_lot` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sale_reservation_header" DROP CONSTRAINT "sale_reservation_header_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "sale_reservation_header" DROP CONSTRAINT "sale_reservation_header_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "sale_reservation_header" DROP CONSTRAINT "sale_reservation_header_emp_area_id_fkey";

-- DropForeignKey
ALTER TABLE "sale_reservation_header" DROP CONSTRAINT "sale_reservation_header_emp_dept_id_fkey";

-- DropForeignKey
ALTER TABLE "sale_reservation_header" DROP CONSTRAINT "sale_reservation_header_project_id_fkey";

-- DropIndex
DROP INDEX "item_lot_lot_no_key";

-- AlterTable
ALTER TABLE "ic_option" DROP COLUMN "trasfer_cost_flag",
ADD COLUMN     "transfer_cost_flag" CHAR(1),
DROP COLUMN "check_deficit",
ADD COLUMN     "check_deficit" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "check_deficit_option",
ADD COLUMN     "check_deficit_option" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "check_qty_flag",
ADD COLUMN     "check_qty_flag" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "item_lot" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expiry_date" TIMESTAMP(3),
ADD COLUMN     "mfg_date" TIMESTAMP(3),
ADD COLUMN     "note" TEXT,
ADD COLUMN     "qty_available" DECIMAL(18,6) NOT NULL DEFAULT 0,
ADD COLUMN     "qty_issued" DECIMAL(18,6) NOT NULL DEFAULT 0,
ADD COLUMN     "qty_reserved" DECIMAL(18,6) NOT NULL DEFAULT 0,
ADD COLUMN     "qty_stock" DECIMAL(18,6) NOT NULL DEFAULT 0,
ADD COLUMN     "status" VARCHAR(20) NOT NULL,
ADD COLUMN     "supplier_vendor_id" INTEGER NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "sale_reservation_header";

-- CreateTable
CREATE TABLE "ic_option_list" (
    "option_list_id" SERIAL NOT NULL,
    "ic_option_id" INTEGER NOT NULL,
    "system_document_id" INTEGER NOT NULL,
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "document_code" VARCHAR(50) NOT NULL,
    "document_name" VARCHAR(255) NOT NULL,
    "negative_stock_check" INTEGER NOT NULL DEFAULT 0,
    "negative_stock_mode" INTEGER NOT NULL DEFAULT 0,
    "quantity_validation_flag" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ic_option_list_pkey" PRIMARY KEY ("option_list_id")
);

-- CreateTable
CREATE TABLE "system_document" (
    "system_document_id" SERIAL NOT NULL,
    "system_document_code" VARCHAR(50) NOT NULL,
    "system_document_name" VARCHAR(255) NOT NULL,
    "system_document_name_eng" VARCHAR(255),
    "sort_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "system_document_pkey" PRIMARY KEY ("system_document_id")
);

-- CreateTable
CREATE TABLE "rs_header" (
    "reservation_id" SERIAL NOT NULL,
    "reservation_no" TEXT NOT NULL,
    "reservation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sq_id" INTEGER,
    "aq_id" INTEGER NOT NULL,
    "lead_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "ship_days" INTEGER NOT NULL DEFAULT 0,
    "remarks" TEXT NOT NULL,
    "payment_term_days" INTEGER NOT NULL DEFAULT 0,
    "onhold" TEXT NOT NULL,
    "emp_sale_id" INTEGER,
    "sale_area_id" INTEGER NOT NULL,
    "emp_dept_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "status_remark" TEXT NOT NULL,
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

    CONSTRAINT "rs_header_pkey" PRIMARY KEY ("reservation_id")
);

-- CreateTable
CREATE TABLE "sale_reservation_line" (
    "reservation_line_id" SERIAL NOT NULL,
    "reservation_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "warehouse_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,
    "note" TEXT,
    "lot_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "qty" DECIMAL(18,2) NOT NULL,
    "uom_id" INTEGER NOT NULL,
    "unit_price" DECIMAL(18,2) NOT NULL,
    "discount_expression" VARCHAR(20),
    "discount_amount" DECIMAL(18,2),
    "discount_rate" DECIMAL(9,4),
    "net_amount" DECIMAL(18,2) NOT NULL,

    CONSTRAINT "sale_reservation_line_pkey" PRIMARY KEY ("reservation_line_id")
);

-- CreateIndex
CREATE INDEX "ic_option_list_ic_option_id_idx" ON "ic_option_list"("ic_option_id");

-- CreateIndex
CREATE INDEX "ic_option_list_system_document_id_idx" ON "ic_option_list"("system_document_id");

-- CreateIndex
CREATE INDEX "ic_option_list_sort_order_idx" ON "ic_option_list"("sort_order");

-- CreateIndex
CREATE UNIQUE INDEX "ic_option_list_document_code_key" ON "ic_option_list"("document_code");

-- CreateIndex
CREATE UNIQUE INDEX "system_document_system_document_code_key" ON "system_document"("system_document_code");

-- CreateIndex
CREATE INDEX "system_document_system_document_code_idx" ON "system_document"("system_document_code");

-- CreateIndex
CREATE INDEX "system_document_sort_order_idx" ON "system_document"("sort_order");

-- CreateIndex
CREATE INDEX "system_document_is_active_idx" ON "system_document"("is_active");

-- CreateIndex
CREATE UNIQUE INDEX "rs_header_reservation_no_key" ON "rs_header"("reservation_no");

-- CreateIndex
CREATE INDEX "rs_header_reservation_id_idx" ON "rs_header"("reservation_id");

-- CreateIndex
CREATE INDEX "item_lot_item_id_idx" ON "item_lot"("item_id");

-- CreateIndex
CREATE INDEX "item_lot_expiry_date_idx" ON "item_lot"("expiry_date");

-- CreateIndex
CREATE UNIQUE INDEX "item_lot_item_id_lot_no_key" ON "item_lot"("item_id", "lot_no");

-- AddForeignKey
ALTER TABLE "ic_option_list" ADD CONSTRAINT "ic_option_list_ic_option_id_fkey" FOREIGN KEY ("ic_option_id") REFERENCES "ic_option"("ic_option_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ic_option_list" ADD CONSTRAINT "ic_option_list_system_document_id_fkey" FOREIGN KEY ("system_document_id") REFERENCES "system_document"("system_document_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rs_header" ADD CONSTRAINT "rs_header_sq_id_fkey" FOREIGN KEY ("sq_id") REFERENCES "sq_header"("sq_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rs_header" ADD CONSTRAINT "rs_header_aq_id_fkey" FOREIGN KEY ("aq_id") REFERENCES "sale_quotation_approval_header"("aq_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rs_header" ADD CONSTRAINT "rs_header_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rs_header" ADD CONSTRAINT "rs_header_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rs_header" ADD CONSTRAINT "rs_header_emp_sale_id_fkey" FOREIGN KEY ("emp_sale_id") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rs_header" ADD CONSTRAINT "rs_header_sale_area_id_fkey" FOREIGN KEY ("sale_area_id") REFERENCES "employee_sale_area"("sale_area_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rs_header" ADD CONSTRAINT "rs_header_emp_dept_id_fkey" FOREIGN KEY ("emp_dept_id") REFERENCES "employee_department"("emp_dept_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rs_header" ADD CONSTRAINT "rs_header_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rs_header" ADD CONSTRAINT "rs_header_tax_code_id_fkey" FOREIGN KEY ("tax_code_id") REFERENCES "tax_code"("tax_code_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_reservation_line" ADD CONSTRAINT "sale_reservation_line_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "rs_header"("reservation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_reservation_line" ADD CONSTRAINT "sale_reservation_line_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_reservation_line" ADD CONSTRAINT "sale_reservation_line_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("warehouse_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_reservation_line" ADD CONSTRAINT "sale_reservation_line_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_reservation_line" ADD CONSTRAINT "sale_reservation_line_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "item_lot"("lot_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_reservation_line" ADD CONSTRAINT "sale_reservation_line_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "uom"("uom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_lot" ADD CONSTRAINT "item_lot_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_lot" ADD CONSTRAINT "item_lot_supplier_vendor_id_fkey" FOREIGN KEY ("supplier_vendor_id") REFERENCES "vendor"("vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;
