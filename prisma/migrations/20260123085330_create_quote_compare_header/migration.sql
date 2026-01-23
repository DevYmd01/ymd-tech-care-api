-- DropForeignKey
ALTER TABLE "pr_line" DROP CONSTRAINT "pr_line_item_id_fkey";

-- AlterTable
ALTER TABLE "pr_line" ADD COLUMN     "preferred_vendor_id" INTEGER,
ALTER COLUMN "item_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "quote_compare_header" (
    "qc_id" SERIAL NOT NULL,
    "qc_no" VARCHAR(30) NOT NULL,
    "pr_id" INTEGER NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "quote_compare_header_pkey" PRIMARY KEY ("qc_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "quote_compare_header_qc_no_key" ON "quote_compare_header"("qc_no");

-- AddForeignKey
ALTER TABLE "pr_line" ADD CONSTRAINT "pr_line_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item_type"("item_type_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pr_line" ADD CONSTRAINT "pr_line_preferred_vendor_id_fkey" FOREIGN KEY ("preferred_vendor_id") REFERENCES "vendor"("vendor_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quote_compare_header" ADD CONSTRAINT "quote_compare_header_pr_id_fkey" FOREIGN KEY ("pr_id") REFERENCES "pr_header"("pr_id") ON DELETE RESTRICT ON UPDATE CASCADE;
