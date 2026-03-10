-- AlterTable
ALTER TABLE "vendor" ADD COLUMN     "subject_to_wht" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "vat_registered" BOOLEAN NOT NULL DEFAULT false;
