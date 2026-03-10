/*
  Warnings:

  - You are about to drop the column `exchange_rate` on the `pr_header` table. All the data in the column will be lost.
  - You are about to drop the `exchange_rate_snapshot` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "exchange_rate_snapshot" DROP CONSTRAINT "exchange_rate_snapshot_pr_id_fkey";

-- AlterTable
ALTER TABLE "pr_header" DROP COLUMN "exchange_rate",
ADD COLUMN     "pr_base_currency" VARCHAR(3),
ADD COLUMN     "pr_exchange_rate" DECIMAL(18,6),
ADD COLUMN     "pr_exchange_rate_date" TIMESTAMP(3),
ADD COLUMN     "pr_quote_currency" VARCHAR(3);

-- DropTable
DROP TABLE "exchange_rate_snapshot";
