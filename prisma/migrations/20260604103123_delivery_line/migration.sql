-- AlterTable
ALTER TABLE "delivery_line" ADD COLUMN     "lot_balance_id" INTEGER;

-- AddForeignKey
ALTER TABLE "delivery_line" ADD CONSTRAINT "delivery_line_lot_balance_id_fkey" FOREIGN KEY ("lot_balance_id") REFERENCES "item_lot_balance"("lot_balance_id") ON DELETE SET NULL ON UPDATE CASCADE;
