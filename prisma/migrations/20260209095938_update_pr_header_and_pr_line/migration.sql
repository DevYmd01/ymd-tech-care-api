/*
  Warnings:

  - You are about to drop the column `cost_center_id` on the `pr_line` table. All the data in the column will be lost.
  - You are about to drop the column `item_brandItem_brand_id` on the `pr_line` table. All the data in the column will be lost.
  - You are about to drop the column `item_categoryItem_category_id` on the `pr_line` table. All the data in the column will be lost.
  - You are about to drop the column `preferred_vendor_id` on the `pr_line` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `pr_line` table. All the data in the column will be lost.
  - You are about to drop the column `preferred_vendor_id` on the `rfq_line` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "pr_line" DROP CONSTRAINT "pr_line_cost_center_id_fkey";

-- DropForeignKey
ALTER TABLE "pr_line" DROP CONSTRAINT "pr_line_item_brandItem_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "pr_line" DROP CONSTRAINT "pr_line_item_categoryItem_category_id_fkey";

-- DropForeignKey
ALTER TABLE "pr_line" DROP CONSTRAINT "pr_line_item_id_fkey";

-- DropForeignKey
ALTER TABLE "pr_line" DROP CONSTRAINT "pr_line_preferred_vendor_id_fkey";

-- DropForeignKey
ALTER TABLE "pr_line" DROP CONSTRAINT "pr_line_project_id_fkey";

-- DropForeignKey
ALTER TABLE "rfq_line" DROP CONSTRAINT "rfq_line_preferred_vendor_id_fkey";

-- AlterTable
ALTER TABLE "pr_header" ADD COLUMN     "preferred_vendor_id" INTEGER;

-- AlterTable
ALTER TABLE "pr_line" DROP COLUMN "cost_center_id",
DROP COLUMN "item_brandItem_brand_id",
DROP COLUMN "item_categoryItem_category_id",
DROP COLUMN "preferred_vendor_id",
DROP COLUMN "project_id",
ADD COLUMN     "location" VARCHAR(50);

-- AlterTable
ALTER TABLE "rfq_header" ADD COLUMN     "budget_id" INTEGER,
ADD COLUMN     "cost_center_id" INTEGER,
ADD COLUMN     "gl_account_id" INTEGER,
ADD COLUMN     "project_id" INTEGER;

-- AlterTable
ALTER TABLE "rfq_line" DROP COLUMN "preferred_vendor_id",
ADD COLUMN     "vendorVendor_id" INTEGER;

-- AddForeignKey
ALTER TABLE "pr_header" ADD CONSTRAINT "pr_header_preferred_vendor_id_fkey" FOREIGN KEY ("preferred_vendor_id") REFERENCES "vendor"("vendor_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pr_line" ADD CONSTRAINT "pr_line_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("item_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfq_header" ADD CONSTRAINT "rfq_header_cost_center_id_fkey" FOREIGN KEY ("cost_center_id") REFERENCES "cost_center"("cost_center_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfq_header" ADD CONSTRAINT "rfq_header_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfq_line" ADD CONSTRAINT "rfq_line_vendorVendor_id_fkey" FOREIGN KEY ("vendorVendor_id") REFERENCES "vendor"("vendor_id") ON DELETE SET NULL ON UPDATE CASCADE;
