-- AlterTable
ALTER TABLE "item_type" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- CreateTable
CREATE TABLE "grn_header" (
    "grn_id" SERIAL NOT NULL,
    "grn_no" VARCHAR(30) NOT NULL,
    "po_header_id" INTEGER NOT NULL,
    "grn_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" VARCHAR(20) NOT NULL,
    "received_by" INTEGER,
    "branch_id" INTEGER,
    "warehouse_id" INTEGER,
    "remarks" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "grn_header_pkey" PRIMARY KEY ("grn_id")
);

-- CreateTable
CREATE TABLE "grn_line" (
    "grn_line_id" SERIAL NOT NULL,
    "grn_id" INTEGER NOT NULL,
    "line_no" INTEGER NOT NULL,
    "item_id" INTEGER,
    "pr_line_id" INTEGER NOT NULL,
    "description" VARCHAR(255),
    "qty_received" DECIMAL(18,6) NOT NULL,
    "uom_id" INTEGER NOT NULL,

    CONSTRAINT "grn_line_pkey" PRIMARY KEY ("grn_line_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "grn_header_grn_no_key" ON "grn_header"("grn_no");

-- AddForeignKey
ALTER TABLE "grn_header" ADD CONSTRAINT "grn_header_po_header_id_fkey" FOREIGN KEY ("po_header_id") REFERENCES "po_header"("po_header_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grn_header" ADD CONSTRAINT "grn_header_received_by_fkey" FOREIGN KEY ("received_by") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grn_header" ADD CONSTRAINT "grn_header_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("warehouse_id") ON DELETE SET NULL ON UPDATE CASCADE;
