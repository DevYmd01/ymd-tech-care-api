/*
  Warnings:

  - You are about to drop the column `currency_code` on the `rfq_header` table. All the data in the column will be lost.
  - You are about to drop the column `exchange_rate` on the `rfq_header` table. All the data in the column will be lost.
  - You are about to drop the column `qc_id` on the `rfq_header` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "rfq_header" DROP CONSTRAINT "rfq_header_qc_id_fkey";

-- AlterTable
ALTER TABLE "rfq_header" DROP COLUMN "currency_code",
DROP COLUMN "exchange_rate",
DROP COLUMN "qc_id",
ADD COLUMN     "rfq_base_currency_code" VARCHAR(3),
ADD COLUMN     "rfq_exchange_rate" DECIMAL(18,6),
ADD COLUMN     "rfq_exchange_rate_date" TIMESTAMP(3),
ADD COLUMN     "rfq_quote_currency_code" VARCHAR(3);
