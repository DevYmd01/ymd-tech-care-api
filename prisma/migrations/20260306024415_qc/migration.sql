-- AddForeignKey
ALTER TABLE "qc_header" ADD CONSTRAINT "qc_header_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "org_department"("department_id") ON DELETE RESTRICT ON UPDATE CASCADE;
