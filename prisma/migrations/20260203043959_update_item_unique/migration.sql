/*
  Warnings:

  - A unique constraint covering the columns `[item_code]` on the table `item` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "item_item_code_key" ON "item"("item_code");
