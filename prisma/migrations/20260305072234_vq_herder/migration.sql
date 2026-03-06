-- AlterTable
ALTER TABLE "vq_header" ADD COLUMN     "rfq_vendor_id" INTEGER;

-- AddForeignKey
ALTER TABLE "vq_header" ADD CONSTRAINT "vq_header_rfq_vendor_id_fkey" FOREIGN KEY ("rfq_vendor_id") REFERENCES "rfq_vendor"("rfq_vendor_id") ON DELETE SET NULL ON UPDATE CASCADE;
