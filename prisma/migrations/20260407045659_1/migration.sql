-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "is_vat_registered" BOOLEAN DEFAULT false;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_tax_id_fkey" FOREIGN KEY ("tax_id") REFERENCES "tax_code"("tax_code") ON DELETE SET NULL ON UPDATE CASCADE;
