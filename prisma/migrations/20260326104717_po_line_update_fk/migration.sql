-- DropForeignKey
ALTER TABLE "po_line" DROP CONSTRAINT "po_line_pr_line_id_fkey";

-- AlterTable
ALTER TABLE "po_line" ADD COLUMN     "approval_line_id" INTEGER,
ADD COLUMN     "approved_qty" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "rejected_qty" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "remaining_qty" DECIMAL(65,30) NOT NULL DEFAULT 0,
ALTER COLUMN "pr_line_id" DROP NOT NULL,
ALTER COLUMN "required_receipt_type" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "po_line" ADD CONSTRAINT "po_line_pr_line_id_fkey" FOREIGN KEY ("pr_line_id") REFERENCES "pr_line"("pr_line_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_line" ADD CONSTRAINT "po_line_approval_line_id_fkey" FOREIGN KEY ("approval_line_id") REFERENCES "approval_pr_line"("approval_line_id") ON DELETE SET NULL ON UPDATE CASCADE;
