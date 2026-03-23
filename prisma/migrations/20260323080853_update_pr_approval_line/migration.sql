/*
  Warnings:

  - You are about to drop the column `approval_remark` on the `approval_pr_line` table. All the data in the column will be lost.
  - You are about to drop the column `remarks` on the `approval_pr_line` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "approval_pr_line" DROP COLUMN "approval_remark",
DROP COLUMN "remarks",
ADD COLUMN     "approval_remarks" TEXT;
