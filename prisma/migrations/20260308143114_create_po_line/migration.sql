-- CreateTable
CREATE TABLE "po_line" (
    "po_line_id" SERIAL NOT NULL,
    "po_header_id" INTEGER NOT NULL,
    "line_no" INTEGER NOT NULL,
    "pr_line_id" INTEGER NOT NULL,
    "item_id" INTEGER,
    "description" VARCHAR(255),
    "vendor_id" INTEGER NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "warehouse_id" INTEGER,
    "status" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER,
    "updated_by" INTEGER,
    "qty_ordered" DECIMAL(18,2) NOT NULL,
    "qty_received" DECIMAL(18,2) NOT NULL,
    "uom_id" INTEGER NOT NULL,
    "unit_price" DECIMAL(18,2) NOT NULL,
    "discount_amount" DECIMAL(18,2) NOT NULL,
    "required_receipt_type" VARCHAR(20) NOT NULL,
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

    CONSTRAINT "po_line_pkey" PRIMARY KEY ("po_line_id")
);

-- AddForeignKey
ALTER TABLE "po_line" ADD CONSTRAINT "po_line_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_line" ADD CONSTRAINT "po_line_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_line" ADD CONSTRAINT "po_line_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_line" ADD CONSTRAINT "po_line_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_line" ADD CONSTRAINT "po_line_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("warehouse_id") ON DELETE SET NULL ON UPDATE CASCADE;
