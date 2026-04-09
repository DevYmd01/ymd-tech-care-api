/*
  Warnings:

  - You are about to drop the column `price_list_flag` on the `price_list_item_line` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "price_list_header" ADD COLUMN     "price_list_flag" VARCHAR(20);

-- AlterTable
ALTER TABLE "price_list_item_line" DROP COLUMN "price_list_flag";
