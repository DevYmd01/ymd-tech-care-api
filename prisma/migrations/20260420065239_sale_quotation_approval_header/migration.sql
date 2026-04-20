-- CreateTable
CREATE TABLE "sale_quotation_approval_header" (
    "aq_id" SERIAL NOT NULL,
    "aq_no" VARCHAR(30) NOT NULL,
    "aq_date" DATE NOT NULL,
    "sq_id" INTEGER NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "remarks" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "approval_emp_id" INTEGER NOT NULL,
    "approval_emp_name" VARCHAR(255) NOT NULL,
    "base_currency_code" VARCHAR(3),
    "quote_currency_code" VARCHAR(3),
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

    CONSTRAINT "sale_quotation_approval_header_pkey" PRIMARY KEY ("aq_id")
);

-- CreateTable
CREATE TABLE "sale_quotation_approval_line" (
    "aq_line_id" SERIAL NOT NULL,
    "aq_id" INTEGER NOT NULL,
    "sq_line_id" INTEGER NOT NULL,
    "approved_qty" DECIMAL(18,3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "qty" DECIMAL(18,2) NOT NULL,
    "uom_id" INTEGER NOT NULL,
    "unit_price" DECIMAL(18,2) NOT NULL,
    "discount_expression" VARCHAR(20),
    "discount_amount" DECIMAL(18,2) NOT NULL,
    "discount_rate" DECIMAL(9,4),
    "net_amount" DECIMAL(18,2) NOT NULL,
    "remarks" TEXT,

    CONSTRAINT "sale_quotation_approval_line_pkey" PRIMARY KEY ("aq_line_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sale_quotation_approval_header_aq_no_key" ON "sale_quotation_approval_header"("aq_no");

-- AddForeignKey
ALTER TABLE "sale_quotation_approval_header" ADD CONSTRAINT "sale_quotation_approval_header_sq_id_fkey" FOREIGN KEY ("sq_id") REFERENCES "sq_header"("sq_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_quotation_approval_header" ADD CONSTRAINT "sale_quotation_approval_header_tax_code_id_fkey" FOREIGN KEY ("tax_code_id") REFERENCES "tax_code"("tax_code_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_quotation_approval_line" ADD CONSTRAINT "sale_quotation_approval_line_aq_id_fkey" FOREIGN KEY ("aq_id") REFERENCES "sale_quotation_approval_header"("aq_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_quotation_approval_line" ADD CONSTRAINT "sale_quotation_approval_line_sq_line_id_fkey" FOREIGN KEY ("sq_line_id") REFERENCES "sale_quotation_line"("sq_line_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_quotation_approval_line" ADD CONSTRAINT "sale_quotation_approval_line_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "uom"("uom_id") ON DELETE RESTRICT ON UPDATE CASCADE;
