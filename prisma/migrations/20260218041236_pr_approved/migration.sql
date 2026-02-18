-- AlterTable
ALTER TABLE "pr_header" ADD COLUMN     "approved_at" TIMESTAMP(3),
ADD COLUMN     "approved_by_user_id" INTEGER;

-- CreateTable
CREATE TABLE "rfq_vendor" (
    "rfq_vendor_id" SERIAL NOT NULL,
    "rfq_id" INTEGER NOT NULL,
    "vendor_id" INTEGER NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "sent_at" TIMESTAMP(3),
    "responded_at" TIMESTAMP(3),
    "contact_email" VARCHAR(255),
    "note" TEXT,

    CONSTRAINT "rfq_vendor_pkey" PRIMARY KEY ("rfq_vendor_id")
);

-- CreateTable
CREATE TABLE "vendor_quotation_header" (
    "vendor_quotation_header_id" SERIAL NOT NULL,
    "vendor_quotation_no" VARCHAR(30) NOT NULL,
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

    CONSTRAINT "vendor_quotation_header_pkey" PRIMARY KEY ("vendor_quotation_header_id")
);

-- CreateTable
CREATE TABLE "vendor_quotation_line" (
    "vendor_quotation_line_id" SERIAL NOT NULL,
    "line_no" INTEGER NOT NULL,
    "item_id" INTEGER,
    "description" TEXT,
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

    CONSTRAINT "vendor_quotation_line_pkey" PRIMARY KEY ("vendor_quotation_line_id")
);

-- CreateIndex
CREATE INDEX "rfq_vendor_rfq_id_idx" ON "rfq_vendor"("rfq_id");

-- CreateIndex
CREATE UNIQUE INDEX "rfq_vendor_rfq_id_vendor_id_key" ON "rfq_vendor"("rfq_id", "vendor_id");

-- CreateIndex
CREATE UNIQUE INDEX "vendor_quotation_header_vendor_quotation_no_key" ON "vendor_quotation_header"("vendor_quotation_no");

-- AddForeignKey
ALTER TABLE "pr_header" ADD CONSTRAINT "pr_header_approved_by_user_id_fkey" FOREIGN KEY ("approved_by_user_id") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfq_vendor" ADD CONSTRAINT "rfq_vendor_rfq_id_fkey" FOREIGN KEY ("rfq_id") REFERENCES "rfq_header"("rfq_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfq_vendor" ADD CONSTRAINT "rfq_vendor_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_quotation_header" ADD CONSTRAINT "vendor_quotation_header_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_quotation_header" ADD CONSTRAINT "vendor_quotation_header_pr_id_fkey" FOREIGN KEY ("pr_id") REFERENCES "pr_header"("pr_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_quotation_header" ADD CONSTRAINT "vendor_quotation_header_rfq_id_fkey" FOREIGN KEY ("rfq_id") REFERENCES "rfq_header"("rfq_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_quotation_header" ADD CONSTRAINT "vendor_quotation_header_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_quotation_header" ADD CONSTRAINT "vendor_quotation_header_cost_center_id_fkey" FOREIGN KEY ("cost_center_id") REFERENCES "cost_center"("cost_center_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_quotation_header" ADD CONSTRAINT "vendor_quotation_header_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_quotation_line" ADD CONSTRAINT "vendor_quotation_line_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_quotation_line" ADD CONSTRAINT "vendor_quotation_line_pr_id_fkey" FOREIGN KEY ("pr_id") REFERENCES "pr_header"("pr_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_quotation_line" ADD CONSTRAINT "vendor_quotation_line_rfq_id_fkey" FOREIGN KEY ("rfq_id") REFERENCES "rfq_header"("rfq_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_quotation_line" ADD CONSTRAINT "vendor_quotation_line_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_quotation_line" ADD CONSTRAINT "vendor_quotation_line_cost_center_id_fkey" FOREIGN KEY ("cost_center_id") REFERENCES "cost_center"("cost_center_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_quotation_line" ADD CONSTRAINT "vendor_quotation_line_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE SET NULL ON UPDATE CASCADE;
