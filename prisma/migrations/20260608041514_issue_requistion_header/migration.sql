-- CreateTable
CREATE TABLE "issue_requistion_header" (
    "issue_req_id" SERIAL NOT NULL,
    "issue_req_no" TEXT NOT NULL,
    "issue_req_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "doc_link_ic_id" INTEGER NOT NULL,
    "emp_dept_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "remarks" TEXT,
    "branch_id" INTEGER NOT NULL,
    "cancel_date" TIMESTAMP(3),
    "cancel_flag" CHAR(1) NOT NULL DEFAULT 'N',
    "cancel_remark" TEXT,
    "created_by_emp_id" INTEGER,
    "request_by_emp_id" INTEGER,
    "status" VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    "stock_effect_ic" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "issue_requistion_header_pkey" PRIMARY KEY ("issue_req_id")
);

-- CreateTable
CREATE TABLE "issue_requistion_line" (
    "issue_req_line_id" SERIAL NOT NULL,
    "issue_req_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "qty" DECIMAL(18,6) NOT NULL,
    "uom_id" INTEGER NOT NULL,
    "warehouse_id" INTEGER NOT NULL,
    "location_id" INTEGER NOT NULL,
    "lot_id" INTEGER NOT NULL,
    "lot_balance_id" INTEGER NOT NULL,

    CONSTRAINT "issue_requistion_line_pkey" PRIMARY KEY ("issue_req_line_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "issue_requistion_header_issue_req_no_key" ON "issue_requistion_header"("issue_req_no");

-- AddForeignKey
ALTER TABLE "issue_requistion_header" ADD CONSTRAINT "issue_requistion_header_doc_link_ic_id_fkey" FOREIGN KEY ("doc_link_ic_id") REFERENCES "doc_link_ic"("doc_link_ic_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_requistion_header" ADD CONSTRAINT "issue_requistion_header_emp_dept_id_fkey" FOREIGN KEY ("emp_dept_id") REFERENCES "employee_department"("emp_dept_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_requistion_header" ADD CONSTRAINT "issue_requistion_header_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_requistion_header" ADD CONSTRAINT "issue_requistion_header_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_requistion_header" ADD CONSTRAINT "issue_requistion_header_created_by_emp_id_fkey" FOREIGN KEY ("created_by_emp_id") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_requistion_header" ADD CONSTRAINT "issue_requistion_header_request_by_emp_id_fkey" FOREIGN KEY ("request_by_emp_id") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_requistion_line" ADD CONSTRAINT "issue_requistion_line_issue_req_id_fkey" FOREIGN KEY ("issue_req_id") REFERENCES "issue_requistion_header"("issue_req_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_requistion_line" ADD CONSTRAINT "issue_requistion_line_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_requistion_line" ADD CONSTRAINT "issue_requistion_line_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "item_uom"("item_uom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_requistion_line" ADD CONSTRAINT "issue_requistion_line_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("warehouse_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_requistion_line" ADD CONSTRAINT "issue_requistion_line_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_requistion_line" ADD CONSTRAINT "issue_requistion_line_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "item_lot"("lot_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "issue_requistion_line" ADD CONSTRAINT "issue_requistion_line_lot_balance_id_fkey" FOREIGN KEY ("lot_balance_id") REFERENCES "item_lot_balance"("lot_balance_id") ON DELETE RESTRICT ON UPDATE CASCADE;
