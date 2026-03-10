/*
  Warnings:

  - The `pr_discount_rate` column on the `pr_header` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `line_discount_rate` column on the `pr_line` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "pr_header" ADD COLUMN     "pr_discount_raw" VARCHAR(10),
DROP COLUMN "pr_discount_rate",
ADD COLUMN     "pr_discount_rate" DECIMAL(9,4);

-- AlterTable
ALTER TABLE "pr_line" ADD COLUMN     "line_discount_raw" VARCHAR(10),
DROP COLUMN "line_discount_rate",
ADD COLUMN     "line_discount_rate" DECIMAL(9,4);
