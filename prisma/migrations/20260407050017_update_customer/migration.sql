/*
  Warnings:

  - The `tax_id` column on the `customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "customer" DROP CONSTRAINT "customer_tax_id_fkey";

-- AlterTable
ALTER TABLE "customer" DROP COLUMN "tax_id",
ADD COLUMN     "tax_id" INTEGER;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_tax_id_fkey" FOREIGN KEY ("tax_id") REFERENCES "tax_code"("tax_code_id") ON DELETE SET NULL ON UPDATE CASCADE;
