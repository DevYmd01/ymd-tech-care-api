/*
  Warnings:

  - The `employee_status` column on the `employees` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "employees" DROP COLUMN "employee_status",
ADD COLUMN     "employee_status" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "emp_type" DROP NOT NULL,
ALTER COLUMN "emp_type" SET DEFAULT 'G',
ALTER COLUMN "emp_type" SET DATA TYPE CHAR(10);
