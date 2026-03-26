/*
  Warnings:

  - You are about to drop the column `vq_id` on the `po_header` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "po_header" DROP CONSTRAINT "po_header_vq_id_fkey";

-- AlterTable
ALTER TABLE "po_header" DROP COLUMN "vq_id",
ADD COLUMN     "qc_id" INTEGER;

-- AddForeignKey
ALTER TABLE "po_header" ADD CONSTRAINT "po_header_qc_id_fkey" FOREIGN KEY ("qc_id") REFERENCES "qc_header"("qc_id") ON DELETE SET NULL ON UPDATE CASCADE;
