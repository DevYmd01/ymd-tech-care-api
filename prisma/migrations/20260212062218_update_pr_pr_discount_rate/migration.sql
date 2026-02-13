/*
  Warnings:

  - Added the required column `line_net_amount` to the `pr_line` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pr_header" ADD COLUMN     "pr_discount_amount" DECIMAL(18,2),
ADD COLUMN     "pr_discount_rate" DECIMAL(9,4);

-- AlterTable
ALTER TABLE "pr_line" ADD COLUMN     "line_discount_amount" DECIMAL(18,4),
ADD COLUMN     "line_discount_rate" DECIMAL(9,4),
ADD COLUMN     "line_net_amount" DECIMAL(18,4) NOT NULL;
