-- AddForeignKey
ALTER TABLE "sq_header" ADD CONSTRAINT "sq_header_tax_code_id_fkey" FOREIGN KEY ("tax_code_id") REFERENCES "tax_code"("tax_code_id") ON DELETE SET NULL ON UPDATE CASCADE;
