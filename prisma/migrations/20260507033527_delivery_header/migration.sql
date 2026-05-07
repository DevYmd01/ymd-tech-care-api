-- CreateTable
CREATE TABLE "delivery_header" (
    "delivery_id" SERIAL NOT NULL,
    "delivery_no" TEXT NOT NULL,
    "delivery_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "so_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "ship_to_address" TEXT NOT NULL,
    "ship_method" VARCHAR(50) NOT NULL,
    "carrier" VARCHAR(250) NOT NULL,
    "tracking_no" VARCHAR(50) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "ship_by_emp" INTEGER,
    "docu_date" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "remarks" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "delivery_header_pkey" PRIMARY KEY ("delivery_id")
);

-- CreateTable
CREATE TABLE "delivery_line" (
    "delivery_line_id" SERIAL NOT NULL,
    "delivery_id" INTEGER NOT NULL,
    "so_line_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "qty_shipped" DECIMAL(18,6) NOT NULL,
    "uom_id" INTEGER NOT NULL,
    "warehouse_id" INTEGER,
    "location_id" INTEGER,
    "lot_id" INTEGER,
    "remarks" TEXT,
    "serial_no" VARCHAR(50),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" VARCHAR(20) NOT NULL DEFAULT 'PENDING',

    CONSTRAINT "delivery_line_pkey" PRIMARY KEY ("delivery_line_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "delivery_header_delivery_no_key" ON "delivery_header"("delivery_no");

-- AddForeignKey
ALTER TABLE "delivery_header" ADD CONSTRAINT "delivery_header_so_id_fkey" FOREIGN KEY ("so_id") REFERENCES "sale_order_header"("so_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_header" ADD CONSTRAINT "delivery_header_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_header" ADD CONSTRAINT "delivery_header_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_header" ADD CONSTRAINT "delivery_header_ship_by_emp_fkey" FOREIGN KEY ("ship_by_emp") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_line" ADD CONSTRAINT "delivery_line_delivery_id_fkey" FOREIGN KEY ("delivery_id") REFERENCES "delivery_header"("delivery_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_line" ADD CONSTRAINT "delivery_line_so_line_id_fkey" FOREIGN KEY ("so_line_id") REFERENCES "sale_order_line"("so_line_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_line" ADD CONSTRAINT "delivery_line_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_line" ADD CONSTRAINT "delivery_line_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "uom"("uom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_line" ADD CONSTRAINT "delivery_line_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("warehouse_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_line" ADD CONSTRAINT "delivery_line_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("location_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "delivery_line" ADD CONSTRAINT "delivery_line_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "item_lot"("lot_id") ON DELETE SET NULL ON UPDATE CASCADE;
