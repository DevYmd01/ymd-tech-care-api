/*
  Warnings:

  - You are about to drop the column `appv_issue_req_id` on the `return_issue_stock_header` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "return_issue_stock_header" DROP CONSTRAINT "return_issue_stock_header_appv_issue_req_id_fkey";

-- AlterTable
ALTER TABLE "return_issue_stock_header" DROP COLUMN "appv_issue_req_id";
