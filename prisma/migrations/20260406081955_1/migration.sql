-- CreateTable
CREATE TABLE "customer" (
    "customer_id" SERIAL NOT NULL,
    "customer_code" VARCHAR(30) NOT NULL,
    "customer_name" VARCHAR(200) NOT NULL,
    "customer_nameeng" VARCHAR(200),
    "customer_type_id" INTEGER,
    "customer_group_id" INTEGER,
    "credit_limit" DECIMAL(18,2),
    "credit_term_days" INTEGER,
    "payment_method_default" VARCHAR(50),
    "customer_title" VARCHAR(20),
    "tax_id" VARCHAR(20),
    "business_type_id" INTEGER,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "customer_address" (
    "customer_address_id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "address_type" VARCHAR(20) NOT NULL,
    "address" TEXT NOT NULL,
    "sub_district" VARCHAR(100),
    "district" VARCHAR(100),
    "province" VARCHAR(100),
    "postal_code" VARCHAR(10),
    "country" VARCHAR(100) NOT NULL,
    "contact_person" VARCHAR(255),
    "phone" VARCHAR(20),
    "phone_extension" VARCHAR(20),
    "email" VARCHAR(255),
    "is_default" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "customer_address_pkey" PRIMARY KEY ("customer_address_id")
);

-- CreateTable
CREATE TABLE "customer_branch" (
    "customer_branch_id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "customer_branch_code" VARCHAR(30) NOT NULL,
    "customer_branch_name" VARCHAR(200) NOT NULL,
    "customer_branch_nameeng" VARCHAR(200),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_branch_pkey" PRIMARY KEY ("customer_branch_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_customer_code_key" ON "customer"("customer_code");

-- CreateIndex
CREATE INDEX "customer_address_customer_id_idx" ON "customer_address"("customer_id");

-- CreateIndex
CREATE INDEX "customer_branch_customer_id_idx" ON "customer_branch"("customer_id");

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_customer_type_id_fkey" FOREIGN KEY ("customer_type_id") REFERENCES "customer_type"("customer_type_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_customer_group_id_fkey" FOREIGN KEY ("customer_group_id") REFERENCES "customer_group"("customer_group_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_business_type_id_fkey" FOREIGN KEY ("business_type_id") REFERENCES "business_type"("business_type_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_address" ADD CONSTRAINT "customer_address_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customer_branch" ADD CONSTRAINT "customer_branch_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;
