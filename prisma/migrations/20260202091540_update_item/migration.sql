/*
  Warnings:

  - You are about to drop the column `category_id` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `item_brandItem_brand_id` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `item_classItem_class_id` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `item_designItem_design_id` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `item_groupItem_group_id` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `item_patternItem_pattern_id` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `item_sizeItem_size_id` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `item_type` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `item_typeItem_type_id` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `uom` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `uom_id` on the `item_uom` table. All the data in the column will be lost.
  - Added the required column `base_uom_id` to the `item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `item` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_category_id_fkey";

-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_item_brandItem_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_item_classItem_class_id_fkey";

-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_item_designItem_design_id_fkey";

-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_item_groupItem_group_id_fkey";

-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_item_patternItem_pattern_id_fkey";

-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_item_sizeItem_size_id_fkey";

-- DropForeignKey
ALTER TABLE "item" DROP CONSTRAINT "item_item_typeItem_type_id_fkey";

-- DropForeignKey
ALTER TABLE "item_uom" DROP CONSTRAINT "item_uom_uom_id_fkey";

-- AlterTable
ALTER TABLE "item" DROP COLUMN "category_id",
DROP COLUMN "item_brandItem_brand_id",
DROP COLUMN "item_classItem_class_id",
DROP COLUMN "item_designItem_design_id",
DROP COLUMN "item_groupItem_group_id",
DROP COLUMN "item_patternItem_pattern_id",
DROP COLUMN "item_sizeItem_size_id",
DROP COLUMN "item_type",
DROP COLUMN "item_typeItem_type_id",
DROP COLUMN "uom",
ADD COLUMN     "base_uom_id" INTEGER NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "default_tax_code" VARCHAR(20),
ADD COLUMN     "item_brand_code" VARCHAR(20),
ADD COLUMN     "item_brand_id" INTEGER,
ADD COLUMN     "item_category_code" VARCHAR(20),
ADD COLUMN     "item_category_id" INTEGER,
ADD COLUMN     "item_class_code" VARCHAR(20),
ADD COLUMN     "item_class_id" INTEGER,
ADD COLUMN     "item_design_code" VARCHAR(20),
ADD COLUMN     "item_design_id" INTEGER,
ADD COLUMN     "item_group_code" VARCHAR(20),
ADD COLUMN     "item_group_id" INTEGER,
ADD COLUMN     "item_pattern_code" VARCHAR(20),
ADD COLUMN     "item_pattern_id" INTEGER,
ADD COLUMN     "item_size_code" VARCHAR(20),
ADD COLUMN     "item_size_id" INTEGER,
ADD COLUMN     "item_type_code" VARCHAR(20),
ADD COLUMN     "item_type_id" INTEGER,
ADD COLUMN     "purchase_uom_id" INTEGER,
ADD COLUMN     "sale_uom_id" INTEGER,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "item_uom" DROP COLUMN "uom_id";

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_base_uom_id_fkey" FOREIGN KEY ("base_uom_id") REFERENCES "uom"("uom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_purchase_uom_id_fkey" FOREIGN KEY ("purchase_uom_id") REFERENCES "uom"("uom_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_sale_uom_id_fkey" FOREIGN KEY ("sale_uom_id") REFERENCES "uom"("uom_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_item_type_id_fkey" FOREIGN KEY ("item_type_id") REFERENCES "item_type"("item_type_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_item_category_id_fkey" FOREIGN KEY ("item_category_id") REFERENCES "item_category"("item_category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_item_brand_id_fkey" FOREIGN KEY ("item_brand_id") REFERENCES "item_brand"("item_brand_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_item_pattern_id_fkey" FOREIGN KEY ("item_pattern_id") REFERENCES "item_pattern"("item_pattern_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_item_design_id_fkey" FOREIGN KEY ("item_design_id") REFERENCES "item_design"("item_design_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_item_class_id_fkey" FOREIGN KEY ("item_class_id") REFERENCES "item_class"("item_class_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_item_size_id_fkey" FOREIGN KEY ("item_size_id") REFERENCES "item_size"("item_size_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_item_group_id_fkey" FOREIGN KEY ("item_group_id") REFERENCES "item_group"("item_group_id") ON DELETE SET NULL ON UPDATE CASCADE;
