-- AlterTable
ALTER TABLE "pr_header" ADD COLUMN     "cost_center_id" INTEGER;

-- AddForeignKey
ALTER TABLE "pr_header" ADD CONSTRAINT "pr_header_cost_center_id_fkey" FOREIGN KEY ("cost_center_id") REFERENCES "cost_center"("cost_center_id") ON DELETE SET NULL ON UPDATE CASCADE;
