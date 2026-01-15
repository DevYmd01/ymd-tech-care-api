-- CreateTable
CREATE TABLE "vendor_master" (
    "vendor_id" VARCHAR(20) NOT NULL,
    "vendor_code" VARCHAR(20),
    "vendor_name" VARCHAR(200),
    "vendor_name_en" VARCHAR(200),
    "vendor_type" VARCHAR(30),
    "category" VARCHAR(100),
    "tax_id" VARCHAR(13),
    "branch_name" VARCHAR(100),
    "is_vat_registered" BOOLEAN,
    "wht_applicable" BOOLEAN,
    "payment_term_days" INTEGER,
    "credit_limit" DECIMAL(15,2),
    "currency_code" VARCHAR(3),
    "status" VARCHAR(20),
    "rating" VARCHAR(1),
    "performance_score" DECIMAL(5,2),
    "contact_person" VARCHAR(100),
    "phone" VARCHAR(20),
    "mobile" VARCHAR(20),
    "email" VARCHAR(100),
    "website" VARCHAR(200),
    "address" TEXT,
    "district" VARCHAR(100),
    "province" VARCHAR(100),
    "postal_code" VARCHAR(10),
    "country" VARCHAR(100),
    "registration_date" DATE,
    "approved_date" DATE,
    "last_transaction_date" DATE,
    "total_purchase_amount" DECIMAL(15,2),
    "remark" TEXT,
    "created_by" VARCHAR(50),
    "created_date" TIMESTAMP,
    "updated_by" VARCHAR(50),
    "updated_date" TIMESTAMP,

    CONSTRAINT "vendor_master_pkey" PRIMARY KEY ("vendor_id")
);

-- CreateTable
CREATE TABLE "vendor_contacts" (
    "contact_id" VARCHAR(20) NOT NULL,
    "vendor_id" VARCHAR(20) NOT NULL,
    "contact_name" VARCHAR(100) NOT NULL,
    "position" VARCHAR(100),
    "department" VARCHAR(100),
    "phone" VARCHAR(20),
    "mobile" VARCHAR(20),
    "email" VARCHAR(100),
    "is_primary" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendor_contacts_pkey" PRIMARY KEY ("contact_id")
);

-- CreateIndex
CREATE INDEX "vendor_contacts_vendor_id_idx" ON "vendor_contacts"("vendor_id");

-- AddForeignKey
ALTER TABLE "vendor_contacts" ADD CONSTRAINT "vendor_contacts_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor_master"("vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;
