/*
  Warnings:

  - A unique constraint covering the columns `[item_id,from_uom_id,to_uom_id]` on the table `item_uom` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "item_uom_item_id_from_uom_id_to_uom_id_is_active_key";

-- CreateIndex
CREATE UNIQUE INDEX "item_uom_item_id_from_uom_id_to_uom_id_key" ON "item_uom"("item_id", "from_uom_id", "to_uom_id");
