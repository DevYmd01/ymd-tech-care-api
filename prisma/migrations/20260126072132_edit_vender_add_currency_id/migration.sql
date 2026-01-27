/*
  Warnings:

  - Added the required column `currency_id` to the `vendor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vendor" ADD COLUMN     "currency_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "vendor" ADD CONSTRAINT "vendor_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currency"("currency_id") ON DELETE RESTRICT ON UPDATE CASCADE;
