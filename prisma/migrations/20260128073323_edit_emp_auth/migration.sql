-- DropForeignKey
ALTER TABLE "employee_auth" DROP CONSTRAINT "employee_auth_employee_id_fkey";

-- AlterTable
ALTER TABLE "employee_auth" ALTER COLUMN "employee_id" DROP DEFAULT;
DROP SEQUENCE "employee_auth_employee_id_seq";

-- AddForeignKey
ALTER TABLE "employee_auth" ADD CONSTRAINT "employee_auth_employee_id_fkey" FOREIGN KEY ("employee_id") REFERENCES "employees"("employee_id") ON DELETE CASCADE ON UPDATE CASCADE;
