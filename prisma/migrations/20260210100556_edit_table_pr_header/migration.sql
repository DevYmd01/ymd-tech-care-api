/*
  Warnings:

  - You are about to drop the column `currency_id` on the `pr_header` table. All the data in the column will be lost.
  - You are about to drop the column `total_est_amount` on the `pr_header` table. All the data in the column will be lost.
  - You are about to drop the column `warehouseWarehouse_id` on the `pr_header` table. All the data in the column will be lost.
  - Added the required column `base_total_amount` to the `pr_header` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quote_total_amount` to the `pr_header` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "pr_header" DROP CONSTRAINT "pr_header_currency_id_fkey";

-- DropForeignKey
ALTER TABLE "pr_header" DROP CONSTRAINT "pr_header_warehouseWarehouse_id_fkey";

-- AlterTable
ALTER TABLE "pr_header" DROP COLUMN "currency_id",
DROP COLUMN "total_est_amount",
DROP COLUMN "warehouseWarehouse_id",
ADD COLUMN     "base_total_amount" DECIMAL(18,2) NOT NULL,
ADD COLUMN     "pr_base_currency_code" VARCHAR(3),
ADD COLUMN     "pr_quote_currency_code" VARCHAR(3),
ADD COLUMN     "quote_total_amount" DECIMAL(18,2) NOT NULL;
