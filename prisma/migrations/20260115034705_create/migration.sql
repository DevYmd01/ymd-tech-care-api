-- CreateTable
CREATE TABLE "vendor_bank_accounts" (
    "bank_account_id" VARCHAR(20) NOT NULL,
    "vendor_id" VARCHAR(20) NOT NULL,
    "bank_name" VARCHAR(100) NOT NULL,
    "bank_branch" VARCHAR(100) NOT NULL,
    "account_no" VARCHAR(30) NOT NULL,
    "account_name" VARCHAR(200) NOT NULL,
    "account_type" VARCHAR(20) NOT NULL,
    "swift_code" VARCHAR(20),
    "is_default" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "vendor_bank_accounts_pkey" PRIMARY KEY ("bank_account_id")
);

-- CreateTable
CREATE TABLE "vendor_documents" (
    "document_id" VARCHAR(20) NOT NULL,
    "vendor_id" VARCHAR(20) NOT NULL,
    "document_type" VARCHAR(50),
    "document_no" VARCHAR(50),
    "issue_date" DATE,
    "expiry_date" DATE,
    "file_path" VARCHAR(500),
    "file_name" VARCHAR(200),
    "remark" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendor_documents_pkey" PRIMARY KEY ("document_id")
);

-- CreateIndex
CREATE INDEX "vendor_bank_accounts_vendor_id_idx" ON "vendor_bank_accounts"("vendor_id");

-- CreateIndex
CREATE INDEX "vendor_documents_vendor_id_idx" ON "vendor_documents"("vendor_id");

-- AddForeignKey
ALTER TABLE "vendor_bank_accounts" ADD CONSTRAINT "vendor_bank_accounts_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor_master"("vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_documents" ADD CONSTRAINT "vendor_documents_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor_master"("vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;
