-- DropForeignKey
ALTER TABLE "delivery_line" DROP CONSTRAINT "delivery_line_uom_id_fkey";

-- AddForeignKey
ALTER TABLE "delivery_line" ADD CONSTRAINT "delivery_line_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "item_uom"("item_uom_id") ON DELETE RESTRICT ON UPDATE CASCADE;
