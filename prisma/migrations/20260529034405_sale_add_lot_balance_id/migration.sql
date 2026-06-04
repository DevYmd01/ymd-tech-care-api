/*
  Warnings:

  - Added the required column `status` to the `sale_reservation_line` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sale_order_line" ADD COLUMN     "lot_balance_id" INTEGER;

-- AlterTable
ALTER TABLE "sale_reservation_line"
ADD COLUMN "lot_balance_id" INTEGER,
ADD COLUMN "status" VARCHAR(20) NOT NULL DEFAULT 'OPEN';

-- AddForeignKey
ALTER TABLE "sale_reservation_line" ADD CONSTRAINT "sale_reservation_line_lot_balance_id_fkey" FOREIGN KEY ("lot_balance_id") REFERENCES "item_lot_balance"("lot_balance_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_line" ADD CONSTRAINT "sale_order_line_lot_balance_id_fkey" FOREIGN KEY ("lot_balance_id") REFERENCES "item_lot_balance"("lot_balance_id") ON DELETE SET NULL ON UPDATE CASCADE;
