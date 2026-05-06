/*
  Warnings:

  - You are about to drop the column `department_id` on the `employees` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_department_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_position_id_fkey";

-- AlterTable
ALTER TABLE "employees" DROP COLUMN "department_id",
ADD COLUMN     "emp_dept_id" INTEGER;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_emp_dept_id_fkey" FOREIGN KEY ("emp_dept_id") REFERENCES "employee_department"("emp_dept_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "employee_position"("position_id") ON DELETE SET NULL ON UPDATE CASCADE;
