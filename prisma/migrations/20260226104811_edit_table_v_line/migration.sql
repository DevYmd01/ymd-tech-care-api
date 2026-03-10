/*
  Warnings:

  - You are about to drop the `vendor_quotation_header` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vendor_quotation_line` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "vendor_quotation_header" DROP CONSTRAINT "vendor_quotation_header_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "vendor_quotation_header" DROP CONSTRAINT "vendor_quotation_header_cost_center_id_fkey";

-- DropForeignKey
ALTER TABLE "vendor_quotation_header" DROP CONSTRAINT "vendor_quotation_header_pr_id_fkey";

-- DropForeignKey
ALTER TABLE "vendor_quotation_header" DROP CONSTRAINT "vendor_quotation_header_project_id_fkey";

-- DropForeignKey
ALTER TABLE "vendor_quotation_header" DROP CONSTRAINT "vendor_quotation_header_rfq_id_fkey";

-- DropForeignKey
ALTER TABLE "vendor_quotation_header" DROP CONSTRAINT "vendor_quotation_header_vendor_id_fkey";

-- DropForeignKey
ALTER TABLE "vendor_quotation_line" DROP CONSTRAINT "vendor_quotation_line_branch_id_fkey";

-- DropForeignKey
ALTER TABLE "vendor_quotation_line" DROP CONSTRAINT "vendor_quotation_line_cost_center_id_fkey";

-- DropForeignKey
ALTER TABLE "vendor_quotation_line" DROP CONSTRAINT "vendor_quotation_line_pr_id_fkey";

-- DropForeignKey
ALTER TABLE "vendor_quotation_line" DROP CONSTRAINT "vendor_quotation_line_project_id_fkey";

-- DropForeignKey
ALTER TABLE "vendor_quotation_line" DROP CONSTRAINT "vendor_quotation_line_rfq_id_fkey";

-- DropForeignKey
ALTER TABLE "vendor_quotation_line" DROP CONSTRAINT "vendor_quotation_line_vendor_id_fkey";

-- DropTable
DROP TABLE "vendor_quotation_header";

-- DropTable
DROP TABLE "vendor_quotation_line";

-- CreateTable
CREATE TABLE "vq_header" (
    "vq_header_id" SERIAL NOT NULL,
    "vq_no" VARCHAR(30) NOT NULL,
    "pr_id" INTEGER NOT NULL,
    "rfq_id" INTEGER NOT NULL,
    "vendor_id" INTEGER NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "requested_by" VARCHAR(50) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "quotation_due_date" TIMESTAMP(3),
    "currency_code" VARCHAR(3) NOT NULL,
    "exchange_rate" DECIMAL(18,2) NOT NULL,
    "receive_location" TEXT,
    "payment_term_hint" VARCHAR(20),
    "incoterm" VARCHAR(20),
    "remarks" TEXT,
    "cost_center_id" INTEGER,
    "project_id" INTEGER,
    "budget_id" INTEGER,
    "gl_account_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vq_header_pkey" PRIMARY KEY ("vq_header_id")
);

-- CreateTable
CREATE TABLE "vq_line" (
    "vq_line_id" SERIAL NOT NULL,
    "vq_header_id" INTEGER NOT NULL,
    "line_no" INTEGER NOT NULL,
    "item_id" INTEGER,
    "description" TEXT,
    "pr_line_id" INTEGER NOT NULL,
    "rfq_id" INTEGER NOT NULL,
    "vendor_id" INTEGER NOT NULL,
    "requested_by" VARCHAR(50) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "quotation_due_date" TIMESTAMP(3),
    "currency_code" VARCHAR(3) NOT NULL,
    "exchange_rate" DECIMAL(18,2) NOT NULL,
    "receive_location" TEXT,
    "payment_term_hint" VARCHAR(20),
    "incoterm" VARCHAR(20),
    "remarks" TEXT,
    "cost_center_id" INTEGER,
    "project_id" INTEGER,
    "budget_id" INTEGER,
    "gl_account_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vq_line_pkey" PRIMARY KEY ("vq_line_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "vq_header_vq_no_key" ON "vq_header"("vq_no");

-- AddForeignKey
ALTER TABLE "vq_header" ADD CONSTRAINT "vq_header_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vq_header" ADD CONSTRAINT "vq_header_pr_id_fkey" FOREIGN KEY ("pr_id") REFERENCES "pr_header"("pr_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vq_header" ADD CONSTRAINT "vq_header_rfq_id_fkey" FOREIGN KEY ("rfq_id") REFERENCES "rfq_header"("rfq_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vq_header" ADD CONSTRAINT "vq_header_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vq_header" ADD CONSTRAINT "vq_header_cost_center_id_fkey" FOREIGN KEY ("cost_center_id") REFERENCES "cost_center"("cost_center_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vq_header" ADD CONSTRAINT "vq_header_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vq_line" ADD CONSTRAINT "vq_line_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vq_line" ADD CONSTRAINT "vq_line_vq_header_id_fkey" FOREIGN KEY ("vq_header_id") REFERENCES "vq_header"("vq_header_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vq_line" ADD CONSTRAINT "vq_line_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("item_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vq_line" ADD CONSTRAINT "vq_line_pr_line_id_fkey" FOREIGN KEY ("pr_line_id") REFERENCES "pr_line"("pr_line_id") ON DELETE RESTRICT ON UPDATE CASCADE;
