-- DropForeignKey
ALTER TABLE "qc_header" DROP CONSTRAINT "qc_header_department_id_fkey";

-- AddForeignKey
ALTER TABLE "qc_header" ADD CONSTRAINT "qc_header_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "employee_department"("emp_dept_id") ON DELETE SET NULL ON UPDATE CASCADE;
