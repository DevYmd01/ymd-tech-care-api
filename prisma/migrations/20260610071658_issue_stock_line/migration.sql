/*
  Warnings:

  - The primary key for the `appvissue_requistion_line` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `issue_req_line_id` on the `appvissue_requistion_line` table. All the data in the column will be lost.
  - Added the required column `good_amnt` to the `issue_stock_line` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unit_cost_price` to the `issue_stock_line` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "appvissue_requistion_line" DROP CONSTRAINT "appvissue_requistion_line_pkey",
DROP COLUMN "issue_req_line_id",
ADD COLUMN     "appvissue_req_line_id" SERIAL NOT NULL,
ADD CONSTRAINT "appvissue_requistion_line_pkey" PRIMARY KEY ("appvissue_req_line_id");

-- AlterTable
ALTER TABLE "issue_stock_line" ADD COLUMN     "good_amnt" DECIMAL(18,6) NOT NULL,
ADD COLUMN     "unit_cost_price" DECIMAL(18,6) NOT NULL;
