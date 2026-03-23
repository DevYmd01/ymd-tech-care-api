/*
  Warnings:

  - You are about to drop the column `qty` on the `approval_pr_line` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `approval_pr_line` table. All the data in the column will be lost.
  - Added the required column `approval_qty` to the `approval_pr_line` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "approval_pr_line" DROP COLUMN "qty",
DROP COLUMN "status",
ADD COLUMN     "approval_qty" DECIMAL(18,3) NOT NULL,
ADD COLUMN     "is_cancelled" BOOLEAN NOT NULL DEFAULT false;
