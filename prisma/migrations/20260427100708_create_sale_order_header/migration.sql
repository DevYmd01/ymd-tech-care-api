-- CreateTable
CREATE TABLE "sale_order_header" (
    "so_id" SERIAL NOT NULL,
    "so_no" TEXT NOT NULL,
    "so_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reservation_id" INTEGER NOT NULL,
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
    "cust_po_no" TEXT,
    "cust_po_date" TIMESTAMP(3),

    CONSTRAINT "sale_order_header_pkey" PRIMARY KEY ("so_id")
);

-- CreateTable
CREATE TABLE "sale_order_line" (
    "so_line_id" SERIAL NOT NULL,
    "so_id" INTEGER NOT NULL,
    "reservation_line_id" INTEGER NOT NULL,
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

    CONSTRAINT "sale_order_line_pkey" PRIMARY KEY ("so_line_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sale_order_header_so_no_key" ON "sale_order_header"("so_no");

-- AddForeignKey
ALTER TABLE "sale_order_header" ADD CONSTRAINT "sale_order_header_reservation_id_fkey" FOREIGN KEY ("reservation_id") REFERENCES "rs_header"("reservation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_header" ADD CONSTRAINT "sale_order_header_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_header" ADD CONSTRAINT "sale_order_header_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_header" ADD CONSTRAINT "sale_order_header_emp_sale_id_fkey" FOREIGN KEY ("emp_sale_id") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_header" ADD CONSTRAINT "sale_order_header_sale_area_id_fkey" FOREIGN KEY ("sale_area_id") REFERENCES "employee_sale_area"("sale_area_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_header" ADD CONSTRAINT "sale_order_header_emp_dept_id_fkey" FOREIGN KEY ("emp_dept_id") REFERENCES "employee_department"("emp_dept_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_header" ADD CONSTRAINT "sale_order_header_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_header" ADD CONSTRAINT "sale_order_header_tax_code_id_fkey" FOREIGN KEY ("tax_code_id") REFERENCES "tax_code"("tax_code_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_line" ADD CONSTRAINT "sale_order_line_so_id_fkey" FOREIGN KEY ("so_id") REFERENCES "sale_order_header"("so_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_line" ADD CONSTRAINT "sale_order_line_reservation_line_id_fkey" FOREIGN KEY ("reservation_line_id") REFERENCES "sale_reservation_line"("reservation_line_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_line" ADD CONSTRAINT "sale_order_line_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_line" ADD CONSTRAINT "sale_order_line_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("warehouse_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_line" ADD CONSTRAINT "sale_order_line_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_line" ADD CONSTRAINT "sale_order_line_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "item_lot"("lot_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_line" ADD CONSTRAINT "sale_order_line_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "uom"("uom_id") ON DELETE RESTRICT ON UPDATE CASCADE;
