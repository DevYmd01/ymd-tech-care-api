/*
  Warnings:

  - A unique constraint covering the columns `[item_id,lot_id,warehouse_id,location_id]` on the table `item_lot_balance` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "item_lot_balance_lot_id_warehouse_id_location_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "item_lot_balance_item_id_lot_id_warehouse_id_location_id_key" ON "item_lot_balance"("item_id", "lot_id", "warehouse_id", "location_id");
