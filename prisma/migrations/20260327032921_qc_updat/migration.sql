/*
  Warnings:

  - Made the column `winning_vq_id` on table `qc_header` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "qc_header" DROP CONSTRAINT "qc_header_winning_vq_id_fkey";

-- AlterTable
ALTER TABLE "qc_header" ALTER COLUMN "winning_vq_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "qc_header" ADD CONSTRAINT "qc_header_winning_vq_id_fkey" FOREIGN KEY ("winning_vq_id") REFERENCES "vq_header"("vq_header_id") ON DELETE RESTRICT ON UPDATE CASCADE;
