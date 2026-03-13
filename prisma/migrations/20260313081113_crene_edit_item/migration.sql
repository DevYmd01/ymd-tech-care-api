/*
  Warnings:

  - You are about to drop the column `default_tax_code` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `item_brand_code` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `item_category_code` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `item_class_code` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `item_color_code` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `item_design_code` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `item_grade_code` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `item_group_code` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `item_pattern_code` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `item_size_code` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `item_type_code` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `purchase_uom_id` on the `item` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_base_uom_id_fkey";

-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_purchase_uom_id_fkey";

-- AlterTable
ALTER TABLE "item" DROP COLUMN "default_tax_code",
DROP COLUMN "item_brand_code",
DROP COLUMN "item_category_code",
DROP COLUMN "item_class_code",
DROP COLUMN "item_color_code",
DROP COLUMN "item_design_code",
DROP COLUMN "item_grade_code",
DROP COLUMN "item_group_code",
DROP COLUMN "item_pattern_code",
DROP COLUMN "item_size_code",
DROP COLUMN "item_type_code",
DROP COLUMN "purchase_uom_id",
ADD COLUMN     "barcode_default" VARCHAR(80),
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "is_batch_control" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_expiry_control" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "is_serial_control" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "standard_cost" DECIMAL(18,6),
ADD COLUMN     "tax_code_id" INTEGER,
ALTER COLUMN "base_uom_id" DROP NOT NULL,
ALTER COLUMN "default_issue_policy" DROP DEFAULT,
ALTER COLUMN "lot_tracking_level" DROP DEFAULT,
ALTER COLUMN "serial_tracking_level" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_base_uom_id_fkey" FOREIGN KEY ("base_uom_id") REFERENCES "uom"("uom_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_tax_code_id_fkey" FOREIGN KEY ("tax_code_id") REFERENCES "tax_code"("tax_code_id") ON DELETE SET NULL ON UPDATE CASCADE;
