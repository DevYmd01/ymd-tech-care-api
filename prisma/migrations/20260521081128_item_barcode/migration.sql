/*
  Warnings:

  - You are about to drop the column `uom_id` on the `item_barcode` table. All the data in the column will be lost.
  - Added the required column `item_uom_id` to the `item_barcode` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "item_barcode" DROP CONSTRAINT "item_barcode_uom_id_fkey";

-- AlterTable
ALTER TABLE "item_barcode" DROP COLUMN "uom_id",
ADD COLUMN     "item_uom_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "item_barcode" ADD CONSTRAINT "item_barcode_item_uom_id_fkey" FOREIGN KEY ("item_uom_id") REFERENCES "item_uom"("item_uom_id") ON DELETE RESTRICT ON UPDATE CASCADE;
