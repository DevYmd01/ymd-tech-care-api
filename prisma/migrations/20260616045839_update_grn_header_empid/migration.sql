-- AddForeignKey
ALTER TABLE "grn_header" ADD CONSTRAINT "grn_header_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;
