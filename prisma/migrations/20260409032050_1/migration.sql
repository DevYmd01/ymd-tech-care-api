/*
  Warnings:

  - You are about to drop the column `item_brand_id` on the `price_list_header` table. All the data in the column will be lost.
  - You are about to drop the column `item_id` on the `price_list_header` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "price_list_header" DROP CONSTRAINT "price_list_header_item_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "price_list_header" DROP CONSTRAINT "price_list_header_item_id_fkey";

-- AlterTable
ALTER TABLE "price_list_header" DROP COLUMN "item_brand_id",
DROP COLUMN "item_id";
