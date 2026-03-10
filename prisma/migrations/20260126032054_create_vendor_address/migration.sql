-- CreateEnum
CREATE TYPE "VendorAddressType" AS ENUM ('REGISTERED', 'CONTACT', 'BILLING', 'SHIPPING');

-- CreateTable
CREATE TABLE "vendor_address" (
    "vendor_address_id" SERIAL NOT NULL,
    "vendor_id" INTEGER NOT NULL,
    "address_type" "VendorAddressType" NOT NULL,
    "address" TEXT NOT NULL,
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

    CONSTRAINT "vendor_address_pkey" PRIMARY KEY ("vendor_address_id")
);

-- CreateIndex
CREATE INDEX "vendor_address_vendor_id_idx" ON "vendor_address"("vendor_id");

-- AddForeignKey
ALTER TABLE "vendor_address" ADD CONSTRAINT "vendor_address_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor"("vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;
