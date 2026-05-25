-- DropForeignKey
ALTER TABLE "sale_order_line" DROP CONSTRAINT "sale_order_line_uom_id_fkey";

-- DropForeignKey
ALTER TABLE "sale_reservation_line" DROP CONSTRAINT "sale_reservation_line_uom_id_fkey";

-- AddForeignKey
ALTER TABLE "sale_reservation_line" ADD CONSTRAINT "sale_reservation_line_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "item_uom"("item_uom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_line" ADD CONSTRAINT "sale_order_line_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "item_uom"("item_uom_id") ON DELETE RESTRICT ON UPDATE CASCADE;
