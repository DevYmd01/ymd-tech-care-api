/*
  Warnings:

  - You are about to drop the column `warehouse_id` on the `pr_header` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "pr_header" DROP CONSTRAINT "pr_header_warehouse_id_fkey";

-- AlterTable
ALTER TABLE "pr_header" DROP COLUMN "warehouse_id",
ADD COLUMN     "warehouseWarehouse_id" INTEGER;

-- AlterTable
ALTER TABLE "pr_line" ADD COLUMN     "warehouse_id" INTEGER;

-- AddForeignKey
ALTER TABLE "pr_header" ADD CONSTRAINT "pr_header_warehouseWarehouse_id_fkey" FOREIGN KEY ("warehouseWarehouse_id") REFERENCES "warehouse"("warehouse_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pr_line" ADD CONSTRAINT "pr_line_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("warehouse_id") ON DELETE SET NULL ON UPDATE CASCADE;
