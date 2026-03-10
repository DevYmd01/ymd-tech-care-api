/*
  Warnings:

  - You are about to drop the column `tax_code` on the `pr_line` table. All the data in the column will be lost.
  - You are about to drop the column `tax_code` on the `rfq_line` table. All the data in the column will be lost.
  - Added the required column `line_amount` to the `pr_line` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tax_amount` to the `pr_line` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tax_rate` to the `pr_line` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pr_line" DROP COLUMN "tax_code",
ADD COLUMN     "line_amount" DECIMAL(18,4) NOT NULL,
ADD COLUMN     "tax_amount" DECIMAL(18,4) NOT NULL,
ADD COLUMN     "tax_code_id" INTEGER,
ADD COLUMN     "tax_rate" DECIMAL(9,4) NOT NULL;

-- AlterTable
ALTER TABLE "rfq_line" DROP COLUMN "tax_code",
ADD COLUMN     "tax_code_id" INTEGER;

-- AddForeignKey
ALTER TABLE "pr_line" ADD CONSTRAINT "pr_line_tax_code_id_fkey" FOREIGN KEY ("tax_code_id") REFERENCES "tax_code"("tax_code_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfq_line" ADD CONSTRAINT "rfq_line_tax_code_id_fkey" FOREIGN KEY ("tax_code_id") REFERENCES "tax_code"("tax_code_id") ON DELETE SET NULL ON UPDATE CASCADE;
