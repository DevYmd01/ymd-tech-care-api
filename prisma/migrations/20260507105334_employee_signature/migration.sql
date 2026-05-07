/*
  Warnings:

  - You are about to drop the column `emp_id` on the `employee_signature` table. All the data in the column will be lost.
  - Added the required column `employee_id` to the `employee_signature` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "employee_signature" DROP CONSTRAINT "employee_signature_emp_id_fkey";

-- DropIndex
DROP INDEX "employee_signature_emp_id_idx";

-- AlterTable
ALTER TABLE "employee_signature" DROP COLUMN "emp_id",
ADD COLUMN     "employee_id" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "employee_signature_employee_id_idx" ON "employee_signature"("employee_id");

-- AddForeignKey
ALTER TABLE "employee_signature" ADD CONSTRAINT "employee_signature_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;
