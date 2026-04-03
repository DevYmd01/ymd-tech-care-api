/*
  Warnings:

  - You are about to drop the column `manager_employee_id` on the `employees` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_manager_employee_id_fkey";

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "manager_employee_id";

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_employee_head_id_fkey" FOREIGN KEY ("employee_head_id") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;
