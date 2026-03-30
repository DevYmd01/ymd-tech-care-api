/*
  Warnings:

  - You are about to drop the column `approval_step_id` on the `po_approval` table. All the data in the column will be lost.
  - You are about to drop the column `approval_step_name` on the `po_approval` table. All the data in the column will be lost.
  - Added the required column `approval_emp_id` to the `po_approval` table without a default value. This is not possible if the table is not empty.
  - Added the required column `approval_emp_name` to the `po_approval` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "po_approval" DROP CONSTRAINT "po_approval_approval_step_id_fkey";

-- AlterTable
ALTER TABLE "po_approval" DROP COLUMN "approval_step_id",
DROP COLUMN "approval_step_name",
ADD COLUMN     "approval_emp_id" INTEGER NOT NULL,
ADD COLUMN     "approval_emp_name" VARCHAR(255) NOT NULL;

-- AddForeignKey
ALTER TABLE "po_approval" ADD CONSTRAINT "po_approval_approval_emp_id_fkey" FOREIGN KEY ("approval_emp_id") REFERENCES "employees"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;
