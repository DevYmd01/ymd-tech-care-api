-- CreateTable
CREATE TABLE "issue_stock_header" (
    "issue_stock_id" SERIAL NOT NULL,
    "issue_stock_no" TEXT NOT NULL,
    "issue_stock_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "appv_issue_req_id" INTEGER NOT NULL,
    "created_by_emp_id" INTEGER NOT NULL,
    "received_by_emp_id" INTEGER,
    "doc_link_ic_id" INTEGER NOT NULL,
    "emp_dept_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "remarks" TEXT,
    "branch_id" INTEGER NOT NULL,
    "stock_effect_ic" INTEGER,
    "doc_type_no" INTEGER,
    "doc_type_name" VARCHAR(50),
    "status" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "issue_stock_header_pkey" PRIMARY KEY ("issue_stock_id")
);

-- CreateTable
CREATE TABLE "issue_stock_line" (
    "issue_stock_line_id" SERIAL NOT NULL,
    "issue_stock_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "qty" DECIMAL(18,6) NOT NULL,
    "approved_qty" DECIMAL(18,6) NOT NULL,
    "uom_id" INTEGER NOT NULL,
    "warehouse_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,
    "lot_id" INTEGER NOT NULL,
    "lot_balance_id" INTEGER NOT NULL,
    "standard_buy_price" DECIMAL(18,6) NOT NULL,
    "standard_cost_price" DECIMAL(18,6) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "issue_stock_line_pkey" PRIMARY KEY ("issue_stock_line_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "issue_stock_header_issue_stock_no_key" ON "issue_stock_header"("issue_stock_no");

-- AddForeignKey
ALTER TABLE "issue_stock_header" ADD CONSTRAINT "issue_stock_header_appv_issue_req_id_fkey" FOREIGN KEY ("appv_issue_req_id") REFERENCES "appvissue_requistion_header"("appv_issue_req_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_stock_header" ADD CONSTRAINT "issue_stock_header_created_by_emp_id_fkey" FOREIGN KEY ("created_by_emp_id") REFERENCES "employees"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_stock_header" ADD CONSTRAINT "issue_stock_header_received_by_emp_id_fkey" FOREIGN KEY ("received_by_emp_id") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_stock_header" ADD CONSTRAINT "issue_stock_header_doc_link_ic_id_fkey" FOREIGN KEY ("doc_link_ic_id") REFERENCES "doc_link_ic"("doc_link_ic_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_stock_header" ADD CONSTRAINT "issue_stock_header_emp_dept_id_fkey" FOREIGN KEY ("emp_dept_id") REFERENCES "employee_department"("emp_dept_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_stock_header" ADD CONSTRAINT "issue_stock_header_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_stock_header" ADD CONSTRAINT "issue_stock_header_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_stock_line" ADD CONSTRAINT "issue_stock_line_issue_stock_id_fkey" FOREIGN KEY ("issue_stock_id") REFERENCES "issue_stock_header"("issue_stock_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_stock_line" ADD CONSTRAINT "issue_stock_line_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_stock_line" ADD CONSTRAINT "issue_stock_line_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "item_uom"("item_uom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_stock_line" ADD CONSTRAINT "issue_stock_line_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("warehouse_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_stock_line" ADD CONSTRAINT "issue_stock_line_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_stock_line" ADD CONSTRAINT "issue_stock_line_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "item_lot"("lot_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_stock_line" ADD CONSTRAINT "issue_stock_line_lot_balance_id_fkey" FOREIGN KEY ("lot_balance_id") REFERENCES "item_lot_balance"("lot_balance_id") ON DELETE RESTRICT ON UPDATE CASCADE;
