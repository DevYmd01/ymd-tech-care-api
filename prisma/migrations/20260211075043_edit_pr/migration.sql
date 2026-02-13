/*
  Warnings:

  - You are about to drop the column `base_total_amount` on the `pr_header` table. All the data in the column will be lost.
  - You are about to drop the column `pr_base_currency` on the `pr_header` table. All the data in the column will be lost.
  - You are about to drop the column `pr_quote_currency` on the `pr_header` table. All the data in the column will be lost.
  - You are about to drop the column `quote_total_amount` on the `pr_header` table. All the data in the column will be lost.
  - Added the required column `pr_base_total_amount` to the `pr_header` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pr_quote_total_amount` to the `pr_header` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pr_header" DROP COLUMN "base_total_amount",
DROP COLUMN "pr_base_currency",
DROP COLUMN "pr_quote_currency",
DROP COLUMN "quote_total_amount",
ADD COLUMN     "pr_base_amount" DECIMAL(18,6),
ADD COLUMN     "pr_base_total_amount" DECIMAL(18,2) NOT NULL,
ADD COLUMN     "pr_quote_amount" DECIMAL(18,6),
ADD COLUMN     "pr_quote_total_amount" DECIMAL(18,2) NOT NULL,
ADD COLUMN     "pr_tax_amount" DECIMAL(18,2),
ADD COLUMN     "pr_tax_code_id" INTEGER,
ADD COLUMN     "pr_tax_rate" DECIMAL(9,4);

-- AddForeignKey
ALTER TABLE "pr_header" ADD CONSTRAINT "pr_header_pr_tax_code_id_fkey" FOREIGN KEY ("pr_tax_code_id") REFERENCES "tax_code"("tax_code_id") ON DELETE SET NULL ON UPDATE CASCADE;
