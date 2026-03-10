-- CreateTable
CREATE TABLE "rfq_header" (
    "rfq_id" SERIAL NOT NULL,
    "rfq_no" VARCHAR(30) NOT NULL,
    "rfq_date" TIMESTAMP(3) NOT NULL,
    "qc_id" INTEGER NOT NULL,
    "pr_id" INTEGER NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "requested_by" VARCHAR(50) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "quotation_due_date" TIMESTAMP(3) NOT NULL,
    "currency_code" VARCHAR(3) NOT NULL,
    "exchange_rate" DECIMAL(18,2) NOT NULL,
    "receive_location" VARCHAR(50) NOT NULL,
    "payment_term_hint" VARCHAR(20) NOT NULL,
    "incoterm" VARCHAR(20) NOT NULL,
    "remarks" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rfq_header_pkey" PRIMARY KEY ("rfq_id")
);

-- AddForeignKey
ALTER TABLE "rfq_header" ADD CONSTRAINT "rfq_header_qc_id_fkey" FOREIGN KEY ("qc_id") REFERENCES "quote_compare_header"("qc_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfq_header" ADD CONSTRAINT "rfq_header_pr_id_fkey" FOREIGN KEY ("pr_id") REFERENCES "pr_header"("pr_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfq_header" ADD CONSTRAINT "rfq_header_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;
