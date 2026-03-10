/*
  Warnings:

  - You are about to drop the column `budget_id` on the `rfq_header` table. All the data in the column will be lost.
  - You are about to drop the column `gl_account_id` on the `rfq_header` table. All the data in the column will be lost.
  - You are about to drop the column `cost_center_id` on the `rfq_line` table. All the data in the column will be lost.
  - You are about to drop the column `item_brandItem_brand_id` on the `rfq_line` table. All the data in the column will be lost.
  - You are about to drop the column `item_categoryItem_category_id` on the `rfq_line` table. All the data in the column will be lost.
  - You are about to drop the column `project_id` on the `rfq_line` table. All the data in the column will be lost.
  - You are about to drop the column `tax_code_id` on the `rfq_line` table. All the data in the column will be lost.
  - You are about to drop the column `vendorVendor_id` on the `rfq_line` table. All the data in the column will be lost.
  - You are about to alter the column `description` on the `rfq_line` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `qty` on the `rfq_line` table. The data in that column could be lost. The data in that column will be cast from `Decimal(18,3)` to `Decimal(18,6)`.
  - A unique constraint covering the columns `[line_no]` on the table `rfq_line` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `requested_by_user_id` to the `rfq_header` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pr_line_id` to the `rfq_line` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "rfq_header" DROP CONSTRAINT "rfq_header_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "rfq_line" DROP CONSTRAINT "rfq_line_cost_center_id_fkey";

-- DropForeignKey
ALTER TABLE "rfq_line" DROP CONSTRAINT "rfq_line_item_brandItem_brand_id_fkey";

-- DropForeignKey
ALTER TABLE "rfq_line" DROP CONSTRAINT "rfq_line_item_categoryItem_category_id_fkey";

-- DropForeignKey
ALTER TABLE "rfq_line" DROP CONSTRAINT "rfq_line_item_id_fkey";

-- DropForeignKey
ALTER TABLE "rfq_line" DROP CONSTRAINT "rfq_line_project_id_fkey";

-- DropForeignKey
ALTER TABLE "rfq_line" DROP CONSTRAINT "rfq_line_tax_code_id_fkey";

-- DropForeignKey
ALTER TABLE "rfq_line" DROP CONSTRAINT "rfq_line_vendorVendor_id_fkey";

-- AlterTable
ALTER TABLE "rfq_header" DROP COLUMN "budget_id",
DROP COLUMN "gl_account_id",
ADD COLUMN     "requested_by_user_id" INTEGER NOT NULL,
ALTER COLUMN "branch_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "rfq_line" DROP COLUMN "cost_center_id",
DROP COLUMN "item_brandItem_brand_id",
DROP COLUMN "item_categoryItem_category_id",
DROP COLUMN "project_id",
DROP COLUMN "tax_code_id",
DROP COLUMN "vendorVendor_id",
ADD COLUMN     "note_to_vendor" TEXT,
ADD COLUMN     "pr_line_id" INTEGER NOT NULL,
ADD COLUMN     "target_delivery_date" TIMESTAMP(3),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "qty" SET DEFAULT 0,
ALTER COLUMN "qty" SET DATA TYPE DECIMAL(18,6);

-- CreateIndex
CREATE UNIQUE INDEX "rfq_line_line_no_key" ON "rfq_line"("line_no");

-- AddForeignKey
ALTER TABLE "rfq_header" ADD CONSTRAINT "rfq_header_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfq_header" ADD CONSTRAINT "rfq_header_requested_by_user_id_fkey" FOREIGN KEY ("requested_by_user_id") REFERENCES "employees"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfq_line" ADD CONSTRAINT "rfq_line_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("item_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfq_line" ADD CONSTRAINT "rfq_line_pr_line_id_fkey" FOREIGN KEY ("pr_line_id") REFERENCES "pr_line"("pr_line_id") ON DELETE RESTRICT ON UPDATE CASCADE;
