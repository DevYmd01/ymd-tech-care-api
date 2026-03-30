/*
  Warnings:

  - You are about to drop the column `pr_approval_id` on the `po_header` table. All the data in the column will be lost.
  - You are about to drop the column `approval_line_id` on the `po_line` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "po_header" DROP CONSTRAINT "po_header_pr_approval_id_fkey";

-- DropForeignKey
ALTER TABLE "po_line" DROP CONSTRAINT "po_line_approval_line_id_fkey";

-- AlterTable
ALTER TABLE "po_header" DROP COLUMN "pr_approval_id";

-- AlterTable
ALTER TABLE "po_line" DROP COLUMN "approval_line_id",
ADD COLUMN     "rfq_line_id" INTEGER;

-- AddForeignKey
ALTER TABLE "po_line" ADD CONSTRAINT "po_line_rfq_line_id_fkey" FOREIGN KEY ("rfq_line_id") REFERENCES "rfq_line"("rfq_line_id") ON DELETE SET NULL ON UPDATE CASCADE;
