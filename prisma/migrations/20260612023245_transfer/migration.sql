-- DropForeignKey
ALTER TABLE "transfer_requisition_header" DROP CONSTRAINT "transfer_requisition_header_cancel_emp_id_fkey";

-- AlterTable
ALTER TABLE "transfer_requisition_header" ALTER COLUMN "cancel_emp_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "transfer_requisition_header" ADD CONSTRAINT "transfer_requisition_header_cancel_emp_id_fkey" FOREIGN KEY ("cancel_emp_id") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;
