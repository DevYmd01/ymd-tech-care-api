/*
  Warnings:

  - You are about to drop the column `item_categoryItem_category_id` on the `item` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[item_type_code]` on the table `item_type` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_item_categoryItem_category_id_fkey";

-- AlterTable
ALTER TABLE "item" DROP COLUMN "item_categoryItem_category_id",
ADD COLUMN     "category_id" INTEGER;

-- CreateTable
CREATE TABLE "item_uom" (
    "item_uom_id" TEXT NOT NULL,
    "item_id" INTEGER NOT NULL,
    "from_uom_id" INTEGER NOT NULL,
    "to_uom_id" INTEGER NOT NULL,
    "factor" DECIMAL(18,6) NOT NULL,
    "is_purchase_uom" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "uom_id" INTEGER,

    CONSTRAINT "item_uom_pkey" PRIMARY KEY ("item_uom_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "item_uom_item_id_from_uom_id_to_uom_id_key" ON "item_uom"("item_id", "from_uom_id", "to_uom_id");

-- CreateIndex
CREATE UNIQUE INDEX "item_type_item_type_code_key" ON "item_type"("item_type_code");

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "item_category"("item_category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_uom" ADD CONSTRAINT "item_uom_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_uom" ADD CONSTRAINT "item_uom_from_uom_id_fkey" FOREIGN KEY ("from_uom_id") REFERENCES "uom"("uom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_uom" ADD CONSTRAINT "item_uom_to_uom_id_fkey" FOREIGN KEY ("to_uom_id") REFERENCES "uom"("uom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_uom" ADD CONSTRAINT "item_uom_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "uom"("uom_id") ON DELETE SET NULL ON UPDATE CASCADE;
