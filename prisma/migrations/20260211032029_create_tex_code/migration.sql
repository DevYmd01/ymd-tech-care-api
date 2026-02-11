-- CreateTable
CREATE TABLE "tax_code" (
    "tax_code_id" SERIAL NOT NULL,
    "tax_code" VARCHAR(30) NOT NULL,
    "tax_name" TEXT NOT NULL,
    "description" TEXT,
    "tax_type" VARCHAR(20) NOT NULL,
    "tax_rate" DECIMAL(15,2) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tax_code_pkey" PRIMARY KEY ("tax_code_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tax_code_tax_code_key" ON "tax_code"("tax_code");
