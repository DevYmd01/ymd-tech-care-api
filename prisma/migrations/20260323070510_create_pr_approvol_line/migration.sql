/*
  Warnings:

  - The primary key for the `pr_approval` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `approval_id` column on the `pr_approval` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "pr_approval" DROP CONSTRAINT "pr_approval_pkey",
DROP COLUMN "approval_id",
ADD COLUMN     "approval_id" SERIAL NOT NULL,
ADD CONSTRAINT "pr_approval_pkey" PRIMARY KEY ("approval_id");

-- AlterTable
ALTER TABLE "pr_line" ADD COLUMN     "approved_qty" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "status" VARCHAR(20);

-- CreateTable
CREATE TABLE "approval_pr_line" (
    "approval_line_id" TEXT NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "approval_remark" VARCHAR(255) NOT NULL,
    "qty" DECIMAL(18,3) NOT NULL,
    "remarks" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "pr_line_id" INTEGER NOT NULL,
    "approval_id" INTEGER NOT NULL,

    CONSTRAINT "approval_pr_line_pkey" PRIMARY KEY ("approval_line_id")
);

-- AddForeignKey
ALTER TABLE "approval_pr_line" ADD CONSTRAINT "approval_pr_line_approval_id_fkey" FOREIGN KEY ("approval_id") REFERENCES "pr_approval"("approval_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "approval_pr_line" ADD CONSTRAINT "approval_pr_line_pr_line_id_fkey" FOREIGN KEY ("pr_line_id") REFERENCES "pr_line"("pr_line_id") ON DELETE RESTRICT ON UPDATE CASCADE;
