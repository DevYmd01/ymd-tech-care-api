/*
  Warnings:

  - You are about to drop the column `item_barcode_code` on the `item_barcode` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[barcode]` on the table `item_barcode` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `barcode` to the `item_barcode` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "item_barcode_item_barcode_code_key";

-- AlterTable
ALTER TABLE "item_barcode" DROP COLUMN "item_barcode_code",
ADD COLUMN     "barcode" VARCHAR(30) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "item_barcode_barcode_key" ON "item_barcode"("barcode");
