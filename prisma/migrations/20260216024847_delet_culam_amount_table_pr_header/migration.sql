/*
  Warnings:

  - You are about to drop the column `pr_base_amount` on the `pr_header` table. All the data in the column will be lost.
  - You are about to drop the column `pr_quote_amount` on the `pr_header` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "pr_header" DROP COLUMN "pr_base_amount",
DROP COLUMN "pr_quote_amount";
