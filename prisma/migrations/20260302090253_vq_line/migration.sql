/*
  Warnings:

  - You are about to drop the column `tax_code` on the `vq_line` table. All the data in the column will be lost.
  - You are about to drop the column `tax_code_id` on the `vq_line` table. All the data in the column will be lost.
  - You are about to drop the column `tax_rate` on the `vq_line` table. All the data in the column will be lost.
  - The `discount_amount` column on the `vq_line` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "vq_line" DROP CONSTRAINT "vq_line_tax_code_id_fkey";

-- AlterTable
ALTER TABLE "vq_line" DROP COLUMN "tax_code",
DROP COLUMN "tax_code_id",
DROP COLUMN "tax_rate",
ADD COLUMN     "discount_expression" VARCHAR(20),
DROP COLUMN "discount_amount",
ADD COLUMN     "discount_amount" DECIMAL(9,4);
