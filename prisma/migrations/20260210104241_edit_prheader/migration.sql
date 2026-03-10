/*
  Warnings:

  - The `pr_base_currency` column on the `pr_header` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pr_quote_currency` column on the `pr_header` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "pr_header" DROP COLUMN "pr_base_currency",
ADD COLUMN     "pr_base_currency" DECIMAL(18,6),
DROP COLUMN "pr_quote_currency",
ADD COLUMN     "pr_quote_currency" DECIMAL(18,6);
