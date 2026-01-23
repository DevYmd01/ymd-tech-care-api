-- CreateTable
CREATE TABLE "vendor_type" (
    "vendor_type_id" SERIAL NOT NULL,
    "vendor_type_code" VARCHAR(30) NOT NULL,
    "vendor_type_name" VARCHAR(200) NOT NULL,
    "vendor_type_nameeng" VARCHAR(200) NOT NULL,
    "description" TEXT NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendor_type_pkey" PRIMARY KEY ("vendor_type_id")
);

-- CreateTable
CREATE TABLE "vendor_group" (
    "vendor_group_id" SERIAL NOT NULL,
    "vendor_group_code" VARCHAR(30) NOT NULL,
    "vendor_group_name" VARCHAR(200) NOT NULL,
    "vendor_group_nameeng" VARCHAR(200) NOT NULL,
    "description" TEXT NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendor_group_pkey" PRIMARY KEY ("vendor_group_id")
);

-- CreateTable
CREATE TABLE "tax_group" (
    "tax_group_id" SERIAL NOT NULL,
    "tax_group_code" VARCHAR(30) NOT NULL,
    "description" TEXT NOT NULL,
    "tax_type" VARCHAR(20) NOT NULL,
    "tax_rate" DECIMAL(15,2) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tax_group_pkey" PRIMARY KEY ("tax_group_id")
);

-- CreateTable
CREATE TABLE "currency" (
    "currency_id" SERIAL NOT NULL,
    "currency_code" VARCHAR(30) NOT NULL,
    "currency_name" VARCHAR(200) NOT NULL,
    "currency_nameeng" VARCHAR(200) NOT NULL,
    "exchange_rate" DECIMAL(15,2) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "currency_pkey" PRIMARY KEY ("currency_id")
);
