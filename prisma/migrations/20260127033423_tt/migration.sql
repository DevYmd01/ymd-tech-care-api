/*
  Warnings:

  - You are about to drop the column `currency_code` on the `vendor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "vendor" DROP CONSTRAINT "vendor_currency_id_fkey";

-- DropForeignKey
ALTER TABLE "vendor_bank_accounts" DROP CONSTRAINT "vendor_bank_accounts_vendor_id_fkey";

-- DropForeignKey
ALTER TABLE "vendor_contacts" DROP CONSTRAINT "vendor_contacts_vendor_id_fkey";

-- AlterTable
ALTER TABLE "vendor" DROP COLUMN "currency_code",
ALTER COLUMN "currency_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "vendor_bank_accounts" ADD COLUMN     "vendor_masterVendor_id" INTEGER;

-- AlterTable
ALTER TABLE "vendor_contacts" ADD COLUMN     "vendor_masterVendor_id" INTEGER;

-- AddForeignKey
ALTER TABLE "vendor" ADD CONSTRAINT "vendor_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currency"("currency_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_contacts" ADD CONSTRAINT "vendor_contacts_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_contacts" ADD CONSTRAINT "vendor_contacts_vendor_masterVendor_id_fkey" FOREIGN KEY ("vendor_masterVendor_id") REFERENCES "vendor_master"("vendor_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_bank_accounts" ADD CONSTRAINT "vendor_bank_accounts_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_bank_accounts" ADD CONSTRAINT "vendor_bank_accounts_vendor_masterVendor_id_fkey" FOREIGN KEY ("vendor_masterVendor_id") REFERENCES "vendor_master"("vendor_id") ON DELETE SET NULL ON UPDATE CASCADE;
