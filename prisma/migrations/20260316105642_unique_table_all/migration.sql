/*
  Warnings:

  - You are about to alter the column `module_code` on the `document_format` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - A unique constraint covering the columns `[currency_type_code]` on the table `currency_type` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[item_barcode_code]` on the table `item_barcode` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[item_brand_code]` on the table `item_brand` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[item_category_code]` on the table `item_category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[item_class_code]` on the table `item_class` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[item_color_code]` on the table `item_color` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[item_design_code]` on the table `item_design` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[item_grade_code]` on the table `item_grade` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[item_group_code]` on the table `item_group` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[item_pattern_code]` on the table `item_pattern` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[item_size_code]` on the table `item_size` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[term_code]` on the table `payment_terms` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pr_no]` on the table `pr_header` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[receive_place_code]` on the table `receive_place` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[rfq_no]` on the table `rfq_header` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[uom_code]` on the table `uom` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[category_code]` on the table `vendor_categories` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vendor_group_code]` on the table `vendor_group` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[vendor_type_code]` on the table `vendor_type` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "document_format" ALTER COLUMN "module_code" SET DATA TYPE VARCHAR(30);

-- CreateIndex
CREATE UNIQUE INDEX "currency_type_currency_type_code_key" ON "currency_type"("currency_type_code");

-- CreateIndex
CREATE UNIQUE INDEX "item_barcode_item_barcode_code_key" ON "item_barcode"("item_barcode_code");

-- CreateIndex
CREATE UNIQUE INDEX "item_brand_item_brand_code_key" ON "item_brand"("item_brand_code");

-- CreateIndex
CREATE UNIQUE INDEX "item_category_item_category_code_key" ON "item_category"("item_category_code");

-- CreateIndex
CREATE UNIQUE INDEX "item_class_item_class_code_key" ON "item_class"("item_class_code");

-- CreateIndex
CREATE UNIQUE INDEX "item_color_item_color_code_key" ON "item_color"("item_color_code");

-- CreateIndex
CREATE UNIQUE INDEX "item_design_item_design_code_key" ON "item_design"("item_design_code");

-- CreateIndex
CREATE UNIQUE INDEX "item_grade_item_grade_code_key" ON "item_grade"("item_grade_code");

-- CreateIndex
CREATE UNIQUE INDEX "item_group_item_group_code_key" ON "item_group"("item_group_code");

-- CreateIndex
CREATE UNIQUE INDEX "item_pattern_item_pattern_code_key" ON "item_pattern"("item_pattern_code");

-- CreateIndex
CREATE UNIQUE INDEX "item_size_item_size_code_key" ON "item_size"("item_size_code");

-- CreateIndex
CREATE UNIQUE INDEX "payment_terms_term_code_key" ON "payment_terms"("term_code");

-- CreateIndex
CREATE UNIQUE INDEX "pr_header_pr_no_key" ON "pr_header"("pr_no");

-- CreateIndex
CREATE UNIQUE INDEX "receive_place_receive_place_code_key" ON "receive_place"("receive_place_code");

-- CreateIndex
CREATE UNIQUE INDEX "rfq_header_rfq_no_key" ON "rfq_header"("rfq_no");

-- CreateIndex
CREATE UNIQUE INDEX "uom_uom_code_key" ON "uom"("uom_code");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_categories_category_code_key" ON "vendor_categories"("category_code");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_group_vendor_group_code_key" ON "vendor_group"("vendor_group_code");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_type_vendor_type_code_key" ON "vendor_type"("vendor_type_code");
