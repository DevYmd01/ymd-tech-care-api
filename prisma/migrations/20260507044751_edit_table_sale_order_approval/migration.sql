-- DropForeignKey
ALTER TABLE "sale_order_approval_header" DROP CONSTRAINT "sale_order_approval_header_branch_id_fkey";

-- AlterTable
ALTER TABLE "sale_order_approval_header" ALTER COLUMN "branch_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "sale_order_approval_header" ADD CONSTRAINT "sale_order_approval_header_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;
