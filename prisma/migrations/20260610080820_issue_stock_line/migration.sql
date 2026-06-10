/*
  Warnings:

  - You are about to drop the column `good_amnt` on the `issue_stock_line` table. All the data in the column will be lost.
  - Added the required column `appvissue_req_line_id` to the `issue_stock_line` table without a default value. This is not possible if the table is not empty.
  - Added the required column `goods_amount` to the `issue_stock_line` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "issue_stock_line" DROP COLUMN "good_amnt",
ADD COLUMN     "appvissue_req_line_id" INTEGER NOT NULL,
ADD COLUMN     "goods_amount" DECIMAL(18,6) NOT NULL;

-- AddForeignKey
ALTER TABLE "issue_stock_line" ADD CONSTRAINT "issue_stock_line_appvissue_req_line_id_fkey" FOREIGN KEY ("appvissue_req_line_id") REFERENCES "appvissue_requistion_line"("appvissue_req_line_id") ON DELETE RESTRICT ON UPDATE CASCADE;
