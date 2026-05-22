/*
  Warnings:

  - You are about to drop the column `uom_id` on the `multi_price_item` table. All the data in the column will be lost.
  - Added the required column `item_uom_id` to the `multi_price_item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "multi_price_item" DROP CONSTRAINT "multi_price_item_uom_id_fkey";

-- DropIndex
DROP INDEX "multi_price_item_uom_id_idx";

-- AlterTable
ALTER TABLE "multi_price_item" DROP COLUMN "uom_id",
ADD COLUMN     "item_uom_id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "multi_price_item_item_uom_id_idx" ON "multi_price_item"("item_uom_id");

-- AddForeignKey
ALTER TABLE "multi_price_item" ADD CONSTRAINT "multi_price_item_item_uom_id_fkey" FOREIGN KEY ("item_uom_id") REFERENCES "item_uom"("item_uom_id") ON DELETE RESTRICT ON UPDATE CASCADE;
