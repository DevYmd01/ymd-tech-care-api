-- AddForeignKey
ALTER TABLE "grn_header" ADD CONSTRAINT "grn_header_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;
