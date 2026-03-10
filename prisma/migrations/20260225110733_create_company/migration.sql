-- CreateTable
CREATE TABLE "company" (
    "company_id" SERIAL NOT NULL,
    "company_code" VARCHAR(20) NOT NULL,
    "company_name" VARCHAR(200) NOT NULL,
    "company_nameeng" VARCHAR(200),
    "company_address" VARCHAR(200),
    "company_addresseng" VARCHAR(200),
    "company_phone" VARCHAR(20),
    "company_email" VARCHAR(200),
    "company_fax" VARCHAR(20),
    "company_tax_id" VARCHAR(20),
    "company_vat_id" VARCHAR(20),
    "company_type" VARCHAR(20),
    "company_status" VARCHAR(20),
    "company_logo" VARCHAR(20),
    "company_stamp" VARCHAR(20),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "company_pkey" PRIMARY KEY ("company_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "company_company_code_key" ON "company"("company_code");
