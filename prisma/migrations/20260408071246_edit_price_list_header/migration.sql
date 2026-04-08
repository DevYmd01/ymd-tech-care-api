/*
  Warnings:

  - You are about to drop the column `price_list_code` on the `price_list_header` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "price_list_header_price_list_code_key";

-- AlterTable
ALTER TABLE "price_list_header" DROP COLUMN "price_list_code";
