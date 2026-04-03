/*
  Warnings:

  - The primary key for the `employee_department` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `department_id` on the `employee_department` table. All the data in the column will be lost.
  - You are about to drop the column `employee_id` on the `employee_department` table. All the data in the column will be lost.
  - You are about to drop the column `side_id` on the `employee_department` table. All the data in the column will be lost.
  - You are about to drop the column `start_date` on the `employee_department` table. All the data in the column will be lost.
  - The primary key for the `employee_sale_period` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `is_active` on the `employee_sale_period` table. All the data in the column will be lost.
  - You are about to drop the column `saleperiod_code` on the `employee_sale_period` table. All the data in the column will be lost.
  - You are about to drop the column `saleperiod_id` on the `employee_sale_period` table. All the data in the column will be lost.
  - You are about to drop the column `saleperiod_name` on the `employee_sale_period` table. All the data in the column will be lost.
  - You are about to drop the column `saleperiod_nameeng` on the `employee_sale_period` table. All the data in the column will be lost.
  - The primary key for the `employee_side` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `side_code` on the `employee_side` table. All the data in the column will be lost.
  - You are about to drop the column `side_id` on the `employee_side` table. All the data in the column will be lost.
  - You are about to drop the column `side_name` on the `employee_side` table. All the data in the column will be lost.
  - You are about to drop the column `side_nameeng` on the `employee_side` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[emp_dept_code]` on the table `employee_department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emp_dept_id]` on the table `employee_department` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emp_side_code]` on the table `employee_side` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emp_dept_code` to the `employee_department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emp_dept_name` to the `employee_department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emp_side_id` to the `employee_department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emp_side_name` to the `employee_department` table without a default value. This is not possible if the table is not empty.
  - Added the required column `begin_date` to the `employee_sale_period` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `employee_sale_period` table without a default value. This is not possible if the table is not empty.
  - The required column `period_id` was added to the `employee_sale_period` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Added the required column `period_target` to the `employee_sale_period` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emp_side_code` to the `employee_side` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emp_side_name` to the `employee_side` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "employee_department" DROP CONSTRAINT "employee_department_side_id_fkey";

-- DropIndex
DROP INDEX "employee_department_department_id_side_id_key";

-- DropIndex
DROP INDEX "employee_sale_period_saleperiod_code_key";

-- DropIndex
DROP INDEX "employee_side_side_code_key";

-- AlterTable
ALTER TABLE "employee_department" DROP CONSTRAINT "employee_department_pkey",
DROP COLUMN "department_id",
DROP COLUMN "employee_id",
DROP COLUMN "side_id",
DROP COLUMN "start_date",
ADD COLUMN     "emp_dept_code" VARCHAR(30) NOT NULL,
ADD COLUMN     "emp_dept_id" SERIAL NOT NULL,
ADD COLUMN     "emp_dept_name" VARCHAR(200) NOT NULL,
ADD COLUMN     "emp_dept_nameeng" VARCHAR(200),
ADD COLUMN     "emp_side_id" INTEGER NOT NULL,
ADD COLUMN     "emp_side_name" INTEGER NOT NULL,
ADD CONSTRAINT "employee_department_pkey" PRIMARY KEY ("emp_dept_id");

-- AlterTable
ALTER TABLE "employee_sale_period" DROP CONSTRAINT "employee_sale_period_pkey",
DROP COLUMN "is_active",
DROP COLUMN "saleperiod_code",
DROP COLUMN "saleperiod_id",
DROP COLUMN "saleperiod_name",
DROP COLUMN "saleperiod_nameeng",
ADD COLUMN     "begin_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "close_status" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "period_id" TEXT NOT NULL,
ADD COLUMN     "period_target" DECIMAL(18,2) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3),
ADD CONSTRAINT "employee_sale_period_pkey" PRIMARY KEY ("period_id");

-- AlterTable
ALTER TABLE "employee_side" DROP CONSTRAINT "employee_side_pkey",
DROP COLUMN "side_code",
DROP COLUMN "side_id",
DROP COLUMN "side_name",
DROP COLUMN "side_nameeng",
ADD COLUMN     "emp_side_code" VARCHAR(30) NOT NULL,
ADD COLUMN     "emp_side_id" SERIAL NOT NULL,
ADD COLUMN     "emp_side_name" VARCHAR(200) NOT NULL,
ADD COLUMN     "emp_side_nameeng" VARCHAR(200),
ADD CONSTRAINT "employee_side_pkey" PRIMARY KEY ("emp_side_id");

-- CreateIndex
CREATE UNIQUE INDEX "employee_department_emp_dept_code_key" ON "employee_department"("emp_dept_code");

-- CreateIndex
CREATE UNIQUE INDEX "employee_department_emp_dept_id_key" ON "employee_department"("emp_dept_id");

-- CreateIndex
CREATE UNIQUE INDEX "employee_side_emp_side_code_key" ON "employee_side"("emp_side_code");

-- AddForeignKey
ALTER TABLE "employee_department" ADD CONSTRAINT "employee_department_emp_side_id_fkey" FOREIGN KEY ("emp_side_id") REFERENCES "employee_side"("emp_side_id") ON DELETE CASCADE ON UPDATE CASCADE;
