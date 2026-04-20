-- AlterTable
ALTER TABLE "sale_quotation_approval_line" ALTER COLUMN "discount_amount" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "sale_quotation_approval_header" ADD CONSTRAINT "sale_quotation_approval_header_approval_emp_id_fkey" FOREIGN KEY ("approval_emp_id") REFERENCES "employees"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;
