-- AlterTable
ALTER TABLE "issue_requistion_line" ADD COLUMN     "status" VARCHAR(20) NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "transfer_requisition_line" ADD COLUMN     "status" VARCHAR(20) NOT NULL DEFAULT 'PENDING';
