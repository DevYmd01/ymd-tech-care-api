/*
  Warnings:

  - The primary key for the `item_uom` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `item_uom_id` column on the `item_uom` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[item_id,from_uom_id,to_uom_id,is_active]` on the table `item_uom` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "item_uom_item_id_from_uom_id_to_uom_id_key";

-- AlterTable
ALTER TABLE "item_uom" DROP CONSTRAINT "item_uom_pkey",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
DROP COLUMN "item_uom_id",
ADD COLUMN     "item_uom_id" SERIAL NOT NULL,
ADD CONSTRAINT "item_uom_pkey" PRIMARY KEY ("item_uom_id");

-- CreateIndex
CREATE UNIQUE INDEX "item_uom_item_id_from_uom_id_to_uom_id_is_active_key" ON "item_uom"("item_id", "from_uom_id", "to_uom_id", "is_active");
