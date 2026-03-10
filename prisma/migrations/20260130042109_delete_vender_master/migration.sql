/*
  Warnings:

  - You are about to drop the column `vendor_masterVendor_id` on the `vendor_bank_accounts` table. All the data in the column will be lost.
  - You are about to drop the column `vendor_masterVendor_id` on the `vendor_contacts` table. All the data in the column will be lost.
  - You are about to drop the `vendor_master` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "vendor_bank_accounts" DROP CONSTRAINT "vendor_bank_accounts_vendor_masterVendor_id_fkey";

-- DropForeignKey
ALTER TABLE "vendor_contacts" DROP CONSTRAINT "vendor_contacts_vendor_masterVendor_id_fkey";

-- DropForeignKey
ALTER TABLE "vendor_documents" DROP CONSTRAINT "vendor_documents_vendor_id_fkey";

-- DropForeignKey
ALTER TABLE "vendor_performance" DROP CONSTRAINT "vendor_performance_vendor_id_fkey";

-- AlterTable
ALTER TABLE "vendor_bank_accounts" DROP COLUMN "vendor_masterVendor_id";

-- AlterTable
ALTER TABLE "vendor_contacts" DROP COLUMN "vendor_masterVendor_id";

-- DropTable
DROP TABLE "vendor_master";

-- AddForeignKey
ALTER TABLE "vendor_documents" ADD CONSTRAINT "vendor_documents_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_performance" ADD CONSTRAINT "vendor_performance_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;
