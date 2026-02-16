-- DropForeignKey
ALTER TABLE "pr_header" DROP CONSTRAINT "pr_header_branch_id_fkey";

-- AlterTable
ALTER TABLE "pr_header" ADD COLUMN     "project_id" INTEGER,
ALTER COLUMN "branch_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "pr_header" ADD CONSTRAINT "pr_header_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pr_header" ADD CONSTRAINT "pr_header_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE SET NULL ON UPDATE CASCADE;
