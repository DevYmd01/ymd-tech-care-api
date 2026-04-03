/*
  Warnings:

  - The primary key for the `employee_sale_period` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `period_id` column on the `employee_sale_period` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `employee_sale_target` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `is_active` on the `employee_sale_target` table. All the data in the column will be lost.
  - You are about to drop the column `saletarget_code` on the `employee_sale_target` table. All the data in the column will be lost.
  - You are about to drop the column `saletarget_id` on the `employee_sale_target` table. All the data in the column will be lost.
  - You are about to drop the column `saletarget_name` on the `employee_sale_target` table. All the data in the column will be lost.
  - You are about to drop the column `saletarget_nameeng` on the `employee_sale_target` table. All the data in the column will be lost.
  - Added the required column `emp_id` to the `employee_sale_target` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period_id` to the `employee_sale_target` table without a default value. This is not possible if the table is not empty.
  - Added the required column `period_target` to the `employee_sale_target` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "employee_sale_target_saletarget_code_key";

-- AlterTable
ALTER TABLE "employee_sale_period" DROP CONSTRAINT "employee_sale_period_pkey",
DROP COLUMN "period_id",
ADD COLUMN     "period_id" SERIAL NOT NULL,
ADD CONSTRAINT "employee_sale_period_pkey" PRIMARY KEY ("period_id");

-- AlterTable
ALTER TABLE "employee_sale_target" DROP CONSTRAINT "employee_sale_target_pkey",
DROP COLUMN "is_active",
DROP COLUMN "saletarget_code",
DROP COLUMN "saletarget_id",
DROP COLUMN "saletarget_name",
DROP COLUMN "saletarget_nameeng",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "emp_id" INTEGER NOT NULL,
ADD COLUMN     "list_no" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "period_id" INTEGER NOT NULL,
ADD COLUMN     "period_target" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "target_id" SERIAL NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD CONSTRAINT "employee_sale_target_pkey" PRIMARY KEY ("target_id");

-- AddForeignKey
ALTER TABLE "employee_sale_target" ADD CONSTRAINT "employee_sale_target_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "employees"("employee_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employee_sale_target" ADD CONSTRAINT "employee_sale_target_period_id_fkey" FOREIGN KEY ("period_id") REFERENCES "employee_sale_period"("period_id") ON DELETE CASCADE ON UPDATE CASCADE;
