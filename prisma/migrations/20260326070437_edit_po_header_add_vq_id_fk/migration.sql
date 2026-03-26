/*
  Warnings:

  - You are about to drop the column `rfq_id` on the `po_header` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "po_header" DROP CONSTRAINT "po_header_rfq_id_fkey";

-- AlterTable
ALTER TABLE "po_header" DROP COLUMN "rfq_id",
ADD COLUMN     "vq_id" INTEGER;

-- AddForeignKey
ALTER TABLE "po_header" ADD CONSTRAINT "po_header_vq_id_fkey" FOREIGN KEY ("vq_id") REFERENCES "vq_header"("vq_header_id") ON DELETE SET NULL ON UPDATE CASCADE;
