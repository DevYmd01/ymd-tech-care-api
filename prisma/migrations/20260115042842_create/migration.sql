/*
  Warnings:

  - The primary key for the `vendor_bank_accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `bank_account_id` column on the `vendor_bank_accounts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `vendor_contacts` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `contact_id` column on the `vendor_contacts` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `vendor_documents` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `document_id` column on the `vendor_documents` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `vendor_master` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `vendor_id` column on the `vendor_master` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `vendor_id` on the `vendor_bank_accounts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `vendor_id` on the `vendor_contacts` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `vendor_id` on the `vendor_documents` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `created_date` on table `vendor_master` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_date` on table `vendor_master` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "vendor_bank_accounts" DROP CONSTRAINT "vendor_bank_accounts_vendor_id_fkey";

-- DropForeignKey
ALTER TABLE "vendor_contacts" DROP CONSTRAINT "vendor_contacts_vendor_id_fkey";

-- DropForeignKey
ALTER TABLE "vendor_documents" DROP CONSTRAINT "vendor_documents_vendor_id_fkey";

-- AlterTable
ALTER TABLE "vendor_bank_accounts" DROP CONSTRAINT "vendor_bank_accounts_pkey",
DROP COLUMN "bank_account_id",
ADD COLUMN     "bank_account_id" SERIAL NOT NULL,
DROP COLUMN "vendor_id",
ADD COLUMN     "vendor_id" INTEGER NOT NULL,
ADD CONSTRAINT "vendor_bank_accounts_pkey" PRIMARY KEY ("bank_account_id");

-- AlterTable
ALTER TABLE "vendor_contacts" DROP CONSTRAINT "vendor_contacts_pkey",
DROP COLUMN "contact_id",
ADD COLUMN     "contact_id" SERIAL NOT NULL,
DROP COLUMN "vendor_id",
ADD COLUMN     "vendor_id" INTEGER NOT NULL,
ADD CONSTRAINT "vendor_contacts_pkey" PRIMARY KEY ("contact_id");

-- AlterTable
ALTER TABLE "vendor_documents" DROP CONSTRAINT "vendor_documents_pkey",
DROP COLUMN "document_id",
ADD COLUMN     "document_id" SERIAL NOT NULL,
DROP COLUMN "vendor_id",
ADD COLUMN     "vendor_id" INTEGER NOT NULL,
ADD CONSTRAINT "vendor_documents_pkey" PRIMARY KEY ("document_id");

-- AlterTable
ALTER TABLE "vendor_master" DROP CONSTRAINT "vendor_master_pkey",
DROP COLUMN "vendor_id",
ADD COLUMN     "vendor_id" SERIAL NOT NULL,
ALTER COLUMN "created_date" SET NOT NULL,
ALTER COLUMN "created_date" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "created_date" SET DATA TYPE TIMESTAMP(3),
ALTER COLUMN "updated_date" SET NOT NULL,
ALTER COLUMN "updated_date" SET DATA TYPE TIMESTAMP(3),
ADD CONSTRAINT "vendor_master_pkey" PRIMARY KEY ("vendor_id");

-- CreateTable
CREATE TABLE "vendor_performance" (
    "performance_id" SERIAL NOT NULL,
    "vendor_id" INTEGER NOT NULL,
    "evaluation_date" DATE,
    "evaluation_period" VARCHAR(20),
    "quality_score" DECIMAL(5,2),
    "delivery_score" DECIMAL(5,2),
    "price_score" DECIMAL(5,2),
    "service_score" DECIMAL(5,2),
    "total_score" DECIMAL(5,2),
    "rating" VARCHAR(1),
    "remark" TEXT,
    "evaluated_by" VARCHAR(50),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "vendor_performance_pkey" PRIMARY KEY ("performance_id")
);

-- CreateTable
CREATE TABLE "vendor_categories" (
    "category_id" SERIAL NOT NULL,
    "category_code" VARCHAR(20),
    "category_name" VARCHAR(100),
    "parent_category_id" VARCHAR(20),
    "is_active" BOOLEAN,

    CONSTRAINT "vendor_categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "payment_terms" (
    "payment_term_id" SERIAL NOT NULL,
    "term_code" VARCHAR(20),
    "term_name" VARCHAR(100),
    "days" INTEGER,
    "is_active" BOOLEAN,

    CONSTRAINT "payment_terms_pkey" PRIMARY KEY ("payment_term_id")
);

-- CreateIndex
CREATE INDEX "vendor_bank_accounts_vendor_id_idx" ON "vendor_bank_accounts"("vendor_id");

-- CreateIndex
CREATE INDEX "vendor_contacts_vendor_id_idx" ON "vendor_contacts"("vendor_id");

-- CreateIndex
CREATE INDEX "vendor_documents_vendor_id_idx" ON "vendor_documents"("vendor_id");

-- AddForeignKey
ALTER TABLE "vendor_contacts" ADD CONSTRAINT "vendor_contacts_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor_master"("vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_bank_accounts" ADD CONSTRAINT "vendor_bank_accounts_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor_master"("vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_documents" ADD CONSTRAINT "vendor_documents_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor_master"("vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor_performance" ADD CONSTRAINT "vendor_performance_vendor_id_fkey" FOREIGN KEY ("vendor_id") REFERENCES "vendor_master"("vendor_id") ON DELETE RESTRICT ON UPDATE CASCADE;
