-- DropForeignKey
ALTER TABLE "return_issue_stock_line" DROP CONSTRAINT "return_issue_stock_line_issue_stock_line_id_fkey";

-- AlterTable
ALTER TABLE "return_issue_stock_line" ALTER COLUMN "issue_stock_line_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "return_issue_stock_line" ADD CONSTRAINT "return_issue_stock_line_issue_stock_line_id_fkey" FOREIGN KEY ("issue_stock_line_id") REFERENCES "issue_stock_line"("issue_stock_line_id") ON DELETE SET NULL ON UPDATE CASCADE;
