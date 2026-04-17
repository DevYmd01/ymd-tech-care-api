-- CreateTable
CREATE TABLE "sq_header" (
    "sq_id" SERIAL NOT NULL,
    "sq_no" VARCHAR(30) NOT NULL,
    "sq_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lead_id" INTEGER,
    "customer_id" INTEGER,
    "branch_id" INTEGER,
    "status" VARCHAR(20) NOT NULL,
    "valid_until" TIMESTAMP(3),
    "remarks" TEXT,
    "payment_term_days" INTEGER NOT NULL,
    "onhold" CHAR(1) NOT NULL,
    "base_currency_code" VARCHAR(3),
    "base_currency_id" INTEGER,
    "quote_currency_code" VARCHAR(3),
    "quote_currency_id" INTEGER,
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
    "emp_area_id" INTEGER,
    "emp_dept_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "sq_status" VARCHAR(20) NOT NULL,
    "status_remark" TEXT,
    "ship_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sq_header_pkey" PRIMARY KEY ("sq_id")
);

-- CreateTable
CREATE TABLE "sale_quotation_line" (
    "sq_line_id" SERIAL NOT NULL,
    "sq_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "note" TEXT,
    "status" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "qty" DECIMAL(18,2) NOT NULL,
    "uom_id" INTEGER NOT NULL,
    "unit_price" DECIMAL(18,2) NOT NULL,
    "tax_code_id" INTEGER,
    "tax_rate" DECIMAL(9,4),
    "discount_expression" VARCHAR(20),
    "discount_amount" DECIMAL(18,2) NOT NULL,
    "discount_rate" DECIMAL(9,4),
    "net_amount" DECIMAL(18,2) NOT NULL,
    "approved_qty" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "rejected_qty" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "remaining_qty" DECIMAL(65,30) NOT NULL DEFAULT 0,

    CONSTRAINT "sale_quotation_line_pkey" PRIMARY KEY ("sq_line_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sq_header_sq_no_key" ON "sq_header"("sq_no");

-- CreateIndex
CREATE INDEX "sale_quotation_line_sq_id_idx" ON "sale_quotation_line"("sq_id");

-- AddForeignKey
ALTER TABLE "sq_header" ADD CONSTRAINT "sq_header_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sq_header" ADD CONSTRAINT "sq_header_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sq_header" ADD CONSTRAINT "sq_header_emp_area_id_fkey" FOREIGN KEY ("emp_area_id") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sq_header" ADD CONSTRAINT "sq_header_emp_dept_id_fkey" FOREIGN KEY ("emp_dept_id") REFERENCES "employee_department"("emp_dept_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sq_header" ADD CONSTRAINT "sq_header_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_quotation_line" ADD CONSTRAINT "sale_quotation_line_sq_id_fkey" FOREIGN KEY ("sq_id") REFERENCES "sq_header"("sq_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_quotation_line" ADD CONSTRAINT "sale_quotation_line_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_quotation_line" ADD CONSTRAINT "sale_quotation_line_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "uom"("uom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_quotation_line" ADD CONSTRAINT "sale_quotation_line_tax_code_id_fkey" FOREIGN KEY ("tax_code_id") REFERENCES "tax_code"("tax_code_id") ON DELETE SET NULL ON UPDATE CASCADE;
