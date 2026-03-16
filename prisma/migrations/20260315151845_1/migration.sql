-- AlterTable
ALTER TABLE "vendor" ADD COLUMN     "tax_code_id" INTEGER;

-- AddForeignKey
ALTER TABLE "vendor" ADD CONSTRAINT "vendor_tax_code_id_fkey" FOREIGN KEY ("tax_code_id") REFERENCES "tax_code"("tax_code_id") ON DELETE SET NULL ON UPDATE CASCADE;
