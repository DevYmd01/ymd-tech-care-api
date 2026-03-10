/*
  Warnings:

  - You are about to drop the column `tax_id` on the `vendor` table. All the data in the column will be lost.
  - You are about to drop the column `vat_registered` on the `vendor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "vendor" DROP COLUMN "tax_id",
DROP COLUMN "vat_registered",
ADD COLUMN     "is_subject_to_wht" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "vat_registration_no" VARCHAR(20);
