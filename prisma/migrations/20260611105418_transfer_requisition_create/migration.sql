-- CreateTable
CREATE TABLE "transfer_requisition_header" (
    "transfer_req_id" SERIAL NOT NULL,
    "transfer_req_no" TEXT NOT NULL,
    "transfer_req_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "doc_link_ic_id" INTEGER NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "created_by_emp_id" INTEGER NOT NULL,
    "transfer_by_emp_id" INTEGER,
    "stock_effect_ic" INTEGER,
    "doc_type_no" INTEGER,
    "doc_type_name" VARCHAR(50),
    "status" VARCHAR(20) NOT NULL DEFAULT 'PENDING',
    "remarks" TEXT,
    "cancel_date" TIMESTAMP(3),
    "cancel_flag" CHAR(1) NOT NULL DEFAULT 'N',
    "cancel_remark" TEXT,
    "cancel_emp_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transfer_requisition_header_pkey" PRIMARY KEY ("transfer_req_id")
);

-- CreateTable
CREATE TABLE "transfer_requisition_line" (
    "transfer_req_line_id" SERIAL NOT NULL,
    "transfer_req_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "qty" DECIMAL(18,6) NOT NULL,
    "uom_id" INTEGER NOT NULL,
    "from_warehouse_id" INTEGER NOT NULL,
    "from_location_id" INTEGER NOT NULL,
    "to_warehouse_id" INTEGER NOT NULL,
    "to_location_id" INTEGER NOT NULL,
    "lot_id" INTEGER NOT NULL,
    "lot_balance_id" INTEGER NOT NULL,
    "remarks" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transfer_requisition_line_pkey" PRIMARY KEY ("transfer_req_line_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transfer_requisition_header_transfer_req_no_key" ON "transfer_requisition_header"("transfer_req_no");

-- AddForeignKey
ALTER TABLE "transfer_requisition_header" ADD CONSTRAINT "transfer_requisition_header_doc_link_ic_id_fkey" FOREIGN KEY ("doc_link_ic_id") REFERENCES "doc_link_ic"("doc_link_ic_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfer_requisition_header" ADD CONSTRAINT "transfer_requisition_header_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfer_requisition_header" ADD CONSTRAINT "transfer_requisition_header_created_by_emp_id_fkey" FOREIGN KEY ("created_by_emp_id") REFERENCES "employees"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfer_requisition_header" ADD CONSTRAINT "transfer_requisition_header_transfer_by_emp_id_fkey" FOREIGN KEY ("transfer_by_emp_id") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfer_requisition_header" ADD CONSTRAINT "transfer_requisition_header_cancel_emp_id_fkey" FOREIGN KEY ("cancel_emp_id") REFERENCES "employees"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfer_requisition_line" ADD CONSTRAINT "transfer_requisition_line_transfer_req_id_fkey" FOREIGN KEY ("transfer_req_id") REFERENCES "transfer_requisition_header"("transfer_req_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfer_requisition_line" ADD CONSTRAINT "transfer_requisition_line_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfer_requisition_line" ADD CONSTRAINT "transfer_requisition_line_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "item_uom"("item_uom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfer_requisition_line" ADD CONSTRAINT "transfer_requisition_line_from_warehouse_id_fkey" FOREIGN KEY ("from_warehouse_id") REFERENCES "warehouse"("warehouse_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfer_requisition_line" ADD CONSTRAINT "transfer_requisition_line_from_location_id_fkey" FOREIGN KEY ("from_location_id") REFERENCES "location"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfer_requisition_line" ADD CONSTRAINT "transfer_requisition_line_to_warehouse_id_fkey" FOREIGN KEY ("to_warehouse_id") REFERENCES "warehouse"("warehouse_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfer_requisition_line" ADD CONSTRAINT "transfer_requisition_line_to_location_id_fkey" FOREIGN KEY ("to_location_id") REFERENCES "location"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfer_requisition_line" ADD CONSTRAINT "transfer_requisition_line_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "item_lot"("lot_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transfer_requisition_line" ADD CONSTRAINT "transfer_requisition_line_lot_balance_id_fkey" FOREIGN KEY ("lot_balance_id") REFERENCES "item_lot_balance"("lot_balance_id") ON DELETE RESTRICT ON UPDATE CASCADE;
