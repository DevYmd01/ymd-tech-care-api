-- AlterTable
ALTER TABLE "rfq_header" ALTER COLUMN "quotation_due_date" DROP NOT NULL,
ALTER COLUMN "receive_location" DROP NOT NULL,
ALTER COLUMN "receive_location" SET DATA TYPE TEXT,
ALTER COLUMN "payment_term_hint" DROP NOT NULL,
ALTER COLUMN "incoterm" DROP NOT NULL,
ALTER COLUMN "remarks" DROP NOT NULL;

-- CreateTable
CREATE TABLE "rfq_line" (
    "rfq_line_id" SERIAL NOT NULL,
    "line_no" INTEGER NOT NULL,
    "item_id" INTEGER,
    "description" TEXT,
    "rfq_id" INTEGER NOT NULL,
    "qty" DECIMAL(18,3) NOT NULL,
    "uom_id" INTEGER NOT NULL,
    "tax_code" VARCHAR(20),
    "cost_center_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "required_receipt_type" VARCHAR(20),
    "preferred_vendor_id" INTEGER,
    "item_categoryItem_category_id" INTEGER,

    CONSTRAINT "rfq_line_pkey" PRIMARY KEY ("rfq_line_id")
);

-- CreateIndex
CREATE INDEX "rfq_line_rfq_id_idx" ON "rfq_line"("rfq_id");

-- CreateIndex
CREATE UNIQUE INDEX "rfq_line_rfq_id_line_no_key" ON "rfq_line"("rfq_id", "line_no");

-- AddForeignKey
ALTER TABLE "rfq_line" ADD CONSTRAINT "rfq_line_rfq_id_fkey" FOREIGN KEY ("rfq_id") REFERENCES "rfq_header"("rfq_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfq_line" ADD CONSTRAINT "rfq_line_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item_type"("item_type_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfq_line" ADD CONSTRAINT "rfq_line_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "uom"("uom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfq_line" ADD CONSTRAINT "rfq_line_cost_center_id_fkey" FOREIGN KEY ("cost_center_id") REFERENCES "cost_center"("cost_center_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfq_line" ADD CONSTRAINT "rfq_line_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfq_line" ADD CONSTRAINT "rfq_line_preferred_vendor_id_fkey" FOREIGN KEY ("preferred_vendor_id") REFERENCES "vendor"("vendor_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfq_line" ADD CONSTRAINT "rfq_line_item_categoryItem_category_id_fkey" FOREIGN KEY ("item_categoryItem_category_id") REFERENCES "item_category"("item_category_id") ON DELETE SET NULL ON UPDATE CASCADE;
