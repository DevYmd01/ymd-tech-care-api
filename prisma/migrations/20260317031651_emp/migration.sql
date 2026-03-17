-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_department_id_fkey";

-- DropForeignKey
ALTER TABLE "employees" DROP CONSTRAINT "employees_position_id_fkey";

-- AlterTable
ALTER TABLE "employees" ALTER COLUMN "branch_id" DROP NOT NULL,
ALTER COLUMN "employee_firstname_en" DROP NOT NULL,
ALTER COLUMN "employee_lastname_en" DROP NOT NULL,
ALTER COLUMN "phone" DROP NOT NULL,
ALTER COLUMN "position_id" DROP NOT NULL,
ALTER COLUMN "department_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "org_department"("department_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "org_position"("position_id") ON DELETE SET NULL ON UPDATE CASCADE;
