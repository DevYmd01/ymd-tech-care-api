-- CreateTable
CREATE TABLE "pr_approval" (
    "approval_id" TEXT NOT NULL,
    "approval_no" VARCHAR(30) NOT NULL,
    "approval_date" DATE NOT NULL,
    "need_by_date" DATE,
    "status" VARCHAR(20) NOT NULL,
    "remarks" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "approval_emp_id" INTEGER NOT NULL,
    "approval_emp_name" VARCHAR(255) NOT NULL,
    "pr_id" INTEGER NOT NULL,
    "base_currency_code" VARCHAR(3),
    "base_currency_id" INTEGER,
    "quote_currency_code" VARCHAR(3),
    "quote_currency_id" INTEGER,
    "exchange_rate" DECIMAL(18,6),
    "exchange_rate_date" TIMESTAMP(3),
    "base_total_amount" DECIMAL(18,2) NOT NULL,
    "quote_total_amount" DECIMAL(18,2) NOT NULL,
    "tax_code_id" INTEGER,
    "tax_rate" DECIMAL(9,4),
    "base_tax_amount" DECIMAL(18,2),
    "quote_tax_amount" DECIMAL(18,2),
    "discount_expression" VARCHAR(20),
    "discount_rate" DECIMAL(9,4),
    "base_discount_amount" DECIMAL(18,2),
    "quote_discount_amount" DECIMAL(18,2),

    CONSTRAINT "pr_approval_pkey" PRIMARY KEY ("approval_id")
);

-- AddForeignKey
ALTER TABLE "pr_approval" ADD CONSTRAINT "pr_approval_pr_id_fkey" FOREIGN KEY ("pr_id") REFERENCES "pr_header"("pr_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pr_approval" ADD CONSTRAINT "pr_approval_approval_emp_id_fkey" FOREIGN KEY ("approval_emp_id") REFERENCES "employees"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pr_approval" ADD CONSTRAINT "pr_approval_base_currency_id_fkey" FOREIGN KEY ("base_currency_id") REFERENCES "currency"("currency_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pr_approval" ADD CONSTRAINT "pr_approval_quote_currency_id_fkey" FOREIGN KEY ("quote_currency_id") REFERENCES "currency"("currency_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pr_approval" ADD CONSTRAINT "pr_approval_tax_code_id_fkey" FOREIGN KEY ("tax_code_id") REFERENCES "tax_code"("tax_code_id") ON DELETE SET NULL ON UPDATE CASCADE;
