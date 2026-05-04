/*
  Warnings:

  - You are about to alter the column `qty` on the `sale_order_line` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,2)` to `Decimal(18,6)`.
  - You are about to alter the column `unit_price` on the `sale_order_line` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,2)` to `Decimal(18,6)`.
  - You are about to alter the column `discount_amount` on the `sale_order_line` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,2)` to `Decimal(18,6)`.
  - You are about to alter the column `discount_rate` on the `sale_order_line` table. The data in that column could be lost. The data in that column will be cast from `Decimal(9,4)` to `Decimal(9,6)`.
  - You are about to alter the column `net_amount` on the `sale_order_line` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,2)` to `Decimal(18,6)`.

*/
-- AlterTable
ALTER TABLE "sale_order_line" ALTER COLUMN "qty" SET DATA TYPE DECIMAL(18,6),
ALTER COLUMN "unit_price" SET DATA TYPE DECIMAL(18,6),
ALTER COLUMN "discount_amount" SET DATA TYPE DECIMAL(18,6),
ALTER COLUMN "discount_rate" SET DATA TYPE DECIMAL(9,6),
ALTER COLUMN "net_amount" SET DATA TYPE DECIMAL(18,6);

-- CreateTable
CREATE TABLE "sale_order_approval_header" (
    "so_approval_id" SERIAL NOT NULL,
    "so_approval_no" VARCHAR(30) NOT NULL,
    "so_approval_date" DATE NOT NULL,
    "so_id" INTEGER NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "remarks" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "approval_emp_id" INTEGER NOT NULL,
    "approval_emp_name" VARCHAR(255) NOT NULL,
    "base_currency_code" VARCHAR(3),
    "order_currency_code" VARCHAR(3),
    "exchange_rate" DECIMAL(18,6),
    "exchange_rate_date" TIMESTAMP(3),
    "base_total_amount" DECIMAL(18,2) NOT NULL,
    "order_total_amount" DECIMAL(18,2) NOT NULL,
    "tax_code_id" INTEGER,
    "tax_rate" DECIMAL(9,6),
    "base_tax_amount" DECIMAL(18,6),
    "order_tax_amount" DECIMAL(18,6),
    "discount_expression" VARCHAR(20),
    "discount_rate" DECIMAL(9,6),
    "base_discount_amount" DECIMAL(18,6),
    "order_discount_amount" DECIMAL(18,6),

    CONSTRAINT "sale_order_approval_header_pkey" PRIMARY KEY ("so_approval_id")
);

-- CreateTable
CREATE TABLE "sale_order_approval_line" (
    "so_approval_line_id" SERIAL NOT NULL,
    "so_approval_id" INTEGER NOT NULL,
    "so_line_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "approved_qty" DECIMAL(18,3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "qty" DECIMAL(18,6) NOT NULL,
    "uom_id" INTEGER NOT NULL,
    "unit_price" DECIMAL(18,2) NOT NULL,
    "discount_expression" VARCHAR(20),
    "discount_amount" DECIMAL(18,6),
    "discount_rate" DECIMAL(9,6),
    "net_amount" DECIMAL(18,6) NOT NULL,
    "remarks" TEXT,

    CONSTRAINT "sale_order_approval_line_pkey" PRIMARY KEY ("so_approval_line_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sale_order_approval_header_so_approval_no_key" ON "sale_order_approval_header"("so_approval_no");

-- AddForeignKey
ALTER TABLE "sale_order_approval_header" ADD CONSTRAINT "sale_order_approval_header_so_id_fkey" FOREIGN KEY ("so_id") REFERENCES "sale_order_header"("so_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_approval_header" ADD CONSTRAINT "sale_order_approval_header_approval_emp_id_fkey" FOREIGN KEY ("approval_emp_id") REFERENCES "employees"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_approval_header" ADD CONSTRAINT "sale_order_approval_header_tax_code_id_fkey" FOREIGN KEY ("tax_code_id") REFERENCES "tax_code"("tax_code_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_approval_line" ADD CONSTRAINT "sale_order_approval_line_so_approval_id_fkey" FOREIGN KEY ("so_approval_id") REFERENCES "sale_order_approval_header"("so_approval_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_approval_line" ADD CONSTRAINT "sale_order_approval_line_so_line_id_fkey" FOREIGN KEY ("so_line_id") REFERENCES "sale_order_line"("so_line_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_approval_line" ADD CONSTRAINT "sale_order_approval_line_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_approval_line" ADD CONSTRAINT "sale_order_approval_line_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "uom"("uom_id") ON DELETE RESTRICT ON UPDATE CASCADE;
