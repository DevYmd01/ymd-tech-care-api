/*
  Warnings:

  - You are about to drop the column `line_total_amount` on the `po_line` table. All the data in the column will be lost.
  - You are about to drop the column `qty_ordered` on the `po_line` table. All the data in the column will be lost.
  - You are about to drop the column `qty_received` on the `po_line` table. All the data in the column will be lost.
  - Added the required column `net_amount` to the `po_line` table without a default value. This is not possible if the table is not empty.
  - Added the required column `qty` to the `po_line` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "po_line" DROP COLUMN "line_total_amount",
DROP COLUMN "qty_ordered",
DROP COLUMN "qty_received",
ADD COLUMN     "net_amount" DECIMAL(18,2) NOT NULL,
ADD COLUMN     "qty" DECIMAL(18,2) NOT NULL;
