-- AddForeignKey
ALTER TABLE "vq_header" ADD CONSTRAINT "vq_header_pr_approval_id_fkey" FOREIGN KEY ("pr_approval_id") REFERENCES "pr_approval"("approval_id") ON DELETE SET NULL ON UPDATE CASCADE;
