-- DropIndex
DROP INDEX "rfq_line_rfq_id_line_no_key";

-- DropIndex
DROP INDEX "rfq_vendor_rfq_id_vendor_id_key";

-- AlterTable
ALTER TABLE "currency" ALTER COLUMN "currency_nameeng" DROP NOT NULL;
