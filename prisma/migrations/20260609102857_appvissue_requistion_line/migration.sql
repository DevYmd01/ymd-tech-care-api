/*
  Warnings:

  - You are about to drop the column `issue_req_id` on the `appvissue_requistion_line` table. All the data in the column will be lost.
  - Added the required column `appv_issue_req_id` to the `appvissue_requistion_line` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "appvissue_requistion_line" DROP CONSTRAINT "appvissue_requistion_line_issue_req_id_fkey";

-- AlterTable
ALTER TABLE "appvissue_requistion_line" DROP COLUMN "issue_req_id",
ADD COLUMN     "appv_issue_req_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "appvissue_requistion_line" ADD CONSTRAINT "appvissue_requistion_line_appv_issue_req_id_fkey" FOREIGN KEY ("appv_issue_req_id") REFERENCES "appvissue_requistion_header"("appv_issue_req_id") ON DELETE RESTRICT ON UPDATE CASCADE;
