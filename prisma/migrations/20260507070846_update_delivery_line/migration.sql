/*
  Warnings:

  - Made the column `warehouse_id` on table `delivery_line` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "delivery_line" DROP CONSTRAINT "delivery_line_warehouse_id_fkey";

-- AlterTable
ALTER TABLE "delivery_line" ALTER COLUMN "warehouse_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "delivery_line" ADD CONSTRAINT "delivery_line_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("warehouse_id") ON DELETE RESTRICT ON UPDATE CASCADE;
