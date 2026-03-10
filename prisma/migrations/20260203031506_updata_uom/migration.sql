/*
  Warnings:

  - Added the required column `uom_nameeng` to the `uom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `uom` table without a default value. This is not possible if the table is not empty.
  - Made the column `is_active` on table `uom` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "uom" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "uom_nameeng" VARCHAR(100) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "is_active" SET NOT NULL,
ALTER COLUMN "is_active" SET DEFAULT true;
