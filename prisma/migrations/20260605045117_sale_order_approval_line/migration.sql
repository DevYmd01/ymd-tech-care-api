-- AlterTable
ALTER TABLE "sale_order_approval_line" ADD COLUMN     "location_id" INTEGER,
ADD COLUMN     "lot_balance_id" INTEGER,
ADD COLUMN     "lot_id" INTEGER,
ADD COLUMN     "warehouse_id" INTEGER;

-- AddForeignKey
ALTER TABLE "sale_order_approval_line" ADD CONSTRAINT "sale_order_approval_line_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "item_lot"("lot_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_approval_line" ADD CONSTRAINT "sale_order_approval_line_lot_balance_id_fkey" FOREIGN KEY ("lot_balance_id") REFERENCES "item_lot_balance"("lot_balance_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_approval_line" ADD CONSTRAINT "sale_order_approval_line_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("location_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_approval_line" ADD CONSTRAINT "sale_order_approval_line_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("warehouse_id") ON DELETE SET NULL ON UPDATE CASCADE;
