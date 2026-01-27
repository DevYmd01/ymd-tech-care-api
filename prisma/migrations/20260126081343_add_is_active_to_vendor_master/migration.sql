/*
  Warnings:

  - You are about to drop the column `vat_registered` on the `vendor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "vendor" DROP COLUMN "vat_registered",
ADD COLUMN     "is_vat_registered" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "is_active" SET DEFAULT true;
