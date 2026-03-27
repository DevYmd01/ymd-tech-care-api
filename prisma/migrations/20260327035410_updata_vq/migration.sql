-- AlterTable
ALTER TABLE "vq_line" ADD COLUMN     "approval_line_id" INTEGER,
ADD COLUMN     "description" VARCHAR(255);

-- AddForeignKey
ALTER TABLE "vq_line" ADD CONSTRAINT "vq_line_approval_line_id_fkey" FOREIGN KEY ("approval_line_id") REFERENCES "approval_pr_line"("approval_line_id") ON DELETE SET NULL ON UPDATE CASCADE;
