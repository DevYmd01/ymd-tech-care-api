-- CreateTable
CREATE TABLE "po_approval" (
    "approval_id" SERIAL NOT NULL,
    "approval_no" VARCHAR(30) NOT NULL,
    "approval_date" DATE NOT NULL,
    "need_by_date" DATE,
    "status" VARCHAR(20) NOT NULL,
    "remarks" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "approval_step_id" INTEGER NOT NULL,
    "approval_step_name" VARCHAR(255) NOT NULL,
    "po_header_id" INTEGER NOT NULL,
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

    CONSTRAINT "po_approval_pkey" PRIMARY KEY ("approval_id")
);

-- CreateTable
CREATE TABLE "approval_po_line" (
    "approval_line_id" SERIAL NOT NULL,
    "po_line_id" INTEGER NOT NULL,
    "approval_id" INTEGER NOT NULL,
    "approved_qty" DECIMAL(18,3) NOT NULL,
    "status" TEXT NOT NULL,
    "remarks" TEXT,
    "approved_at" TIMESTAMP(3),
    "approved_by" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "approval_po_line_pkey" PRIMARY KEY ("approval_line_id")
);

-- AddForeignKey
ALTER TABLE "po_approval" ADD CONSTRAINT "po_approval_po_header_id_fkey" FOREIGN KEY ("po_header_id") REFERENCES "po_header"("po_header_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_approval" ADD CONSTRAINT "po_approval_approval_step_id_fkey" FOREIGN KEY ("approval_step_id") REFERENCES "employees"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_approval" ADD CONSTRAINT "po_approval_base_currency_id_fkey" FOREIGN KEY ("base_currency_id") REFERENCES "currency"("currency_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_approval" ADD CONSTRAINT "po_approval_quote_currency_id_fkey" FOREIGN KEY ("quote_currency_id") REFERENCES "currency"("currency_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "po_approval" ADD CONSTRAINT "po_approval_tax_code_id_fkey" FOREIGN KEY ("tax_code_id") REFERENCES "tax_code"("tax_code_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "approval_po_line" ADD CONSTRAINT "approval_po_line_approval_id_fkey" FOREIGN KEY ("approval_id") REFERENCES "po_approval"("approval_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "approval_po_line" ADD CONSTRAINT "approval_po_line_po_line_id_fkey" FOREIGN KEY ("po_line_id") REFERENCES "po_line"("po_line_id") ON DELETE RESTRICT ON UPDATE CASCADE;
