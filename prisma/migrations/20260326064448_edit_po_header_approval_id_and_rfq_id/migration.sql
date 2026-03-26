-- AlterTable
ALTER TABLE "po_header" ADD COLUMN     "rfq_id" INTEGER;

-- AddForeignKey
ALTER TABLE "po_header" ADD CONSTRAINT "po_header_rfq_id_fkey" FOREIGN KEY ("rfq_id") REFERENCES "rfq_header"("rfq_id") ON DELETE SET NULL ON UPDATE CASCADE;
