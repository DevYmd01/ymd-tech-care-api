/*
  Warnings:

  - You are about to drop the column `approval_qty` on the `approval_pr_line` table. All the data in the column will be lost.
  - You are about to drop the column `approval_remarks` on the `approval_pr_line` table. All the data in the column will be lost.
  - You are about to drop the column `is_active` on the `approval_pr_line` table. All the data in the column will be lost.
  - You are about to drop the column `is_cancelled` on the `approval_pr_line` table. All the data in the column will be lost.
  - Added the required column `approved_qty` to the `approval_pr_line` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "approval_pr_line" DROP COLUMN "approval_qty",
DROP COLUMN "approval_remarks",
DROP COLUMN "is_active",
DROP COLUMN "is_cancelled",
ADD COLUMN     "approved_at" TIMESTAMP(3),
ADD COLUMN     "approved_qty" DECIMAL(18,3) NOT NULL,
ADD COLUMN     "remarks" TEXT;
