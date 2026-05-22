/*
  Warnings:

  - You are about to drop the column `uom_id` on the `price_list_item_line` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "price_list_item_line" DROP CONSTRAINT "price_list_item_line_uom_id_fkey";

-- AlterTable
ALTER TABLE "price_list_item_line" DROP COLUMN "uom_id",
ADD COLUMN     "item_uom_id" INTEGER;

-- AddForeignKey
ALTER TABLE "price_list_item_line" ADD CONSTRAINT "price_list_item_line_item_uom_id_fkey" FOREIGN KEY ("item_uom_id") REFERENCES "item_uom"("item_uom_id") ON DELETE SET NULL ON UPDATE CASCADE;
