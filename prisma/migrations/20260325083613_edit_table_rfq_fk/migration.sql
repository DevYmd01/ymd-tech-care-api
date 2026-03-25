/*
  Warnings:

  - The primary key for the `approval_pr_line` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `approval_line_id` column on the `approval_pr_line` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "approval_pr_line" DROP CONSTRAINT "approval_pr_line_pkey",
DROP COLUMN "approval_line_id",
ADD COLUMN     "approval_line_id" SERIAL NOT NULL,
ADD CONSTRAINT "approval_pr_line_pkey" PRIMARY KEY ("approval_line_id");

-- AlterTable
ALTER TABLE "pr_line" ADD COLUMN     "remaining_qty" DECIMAL(65,30) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "rfq_header" ADD COLUMN     "pr_approval_id" INTEGER;

-- AlterTable
ALTER TABLE "rfq_line" ADD COLUMN     "approval_line_id" INTEGER;

-- AddForeignKey
ALTER TABLE "rfq_header" ADD CONSTRAINT "rfq_header_pr_approval_id_fkey" FOREIGN KEY ("pr_approval_id") REFERENCES "pr_approval"("approval_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfq_line" ADD CONSTRAINT "rfq_line_approval_line_id_fkey" FOREIGN KEY ("approval_line_id") REFERENCES "approval_pr_line"("approval_line_id") ON DELETE SET NULL ON UPDATE CASCADE;
