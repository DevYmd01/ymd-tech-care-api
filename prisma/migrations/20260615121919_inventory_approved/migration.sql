-- AlterTable
ALTER TABLE "issue_requistion_line" ADD COLUMN     "approved_qty" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "rejected_qty" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "remaining_qty" DECIMAL(65,30) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "transfer_requisition_line" ADD COLUMN     "approved_qty" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "rejected_qty" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "remaining_qty" DECIMAL(65,30) NOT NULL DEFAULT 0;
