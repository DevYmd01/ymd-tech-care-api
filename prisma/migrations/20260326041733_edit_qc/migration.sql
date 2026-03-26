-- AlterTable
ALTER TABLE "po_header" ADD COLUMN     "pr_approval_id" INTEGER;

-- AlterTable
ALTER TABLE "vq_header" ADD COLUMN     "pr_approval_id" INTEGER;

-- AddForeignKey
ALTER TABLE "po_header" ADD CONSTRAINT "po_header_pr_approval_id_fkey" FOREIGN KEY ("pr_approval_id") REFERENCES "pr_approval"("approval_id") ON DELETE SET NULL ON UPDATE CASCADE;
