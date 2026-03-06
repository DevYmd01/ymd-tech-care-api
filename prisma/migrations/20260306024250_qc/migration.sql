/*
  Warnings:

  - Added the required column `department_id` to the `qc_header` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "qc_header" ADD COLUMN     "department_id" INTEGER NOT NULL,
ADD COLUMN     "winning_vq_id" INTEGER;

-- AddForeignKey
ALTER TABLE "qc_header" ADD CONSTRAINT "qc_header_winning_vq_id_fkey" FOREIGN KEY ("winning_vq_id") REFERENCES "vq_header"("vq_header_id") ON DELETE SET NULL ON UPDATE CASCADE;
