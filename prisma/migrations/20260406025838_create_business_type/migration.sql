-- CreateTable
CREATE TABLE "business_type" (
    "business_type_id" SERIAL NOT NULL,
    "business_type_code" VARCHAR(30) NOT NULL,
    "business_type_name" VARCHAR(200) NOT NULL,
    "business_type_nameeng" VARCHAR(200),
    "remark" VARCHAR(500),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "business_type_pkey" PRIMARY KEY ("business_type_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "business_type_business_type_code_key" ON "business_type"("business_type_code");
