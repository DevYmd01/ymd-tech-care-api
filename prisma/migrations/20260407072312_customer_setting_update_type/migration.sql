-- DropForeignKey
ALTER TABLE "customer" DROP CONSTRAINT "customer_tax_id_fkey";

-- AlterTable
ALTER TABLE "customer" ALTER COLUMN "tax_id" SET DATA TYPE VARCHAR(20);
