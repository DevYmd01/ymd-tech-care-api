/*
  Warnings:

  - A unique constraint covering the columns `[vendor_code]` on the table `vendor` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "vendor_vendor_code_key" ON "vendor"("vendor_code");
