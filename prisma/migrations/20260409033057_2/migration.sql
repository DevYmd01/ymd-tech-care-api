/*
  Warnings:

  - You are about to drop the column `emp_side_name` on the `employee_department` table. All the data in the column will be lost.
  - You are about to drop the column `end_date` on the `employee_department` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "employee_department" DROP COLUMN "emp_side_name",
DROP COLUMN "end_date";
