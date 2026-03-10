/*
  Warnings:

  - The primary key for the `currency` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `currency_code` on the `currency` table. The data in that column could be lost. The data in that column will be cast from `VarChar(10)` to `VarChar(3)`.
  - You are about to alter the column `currency_name` on the `currency` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(100)`.
  - You are about to alter the column `currency_nameeng` on the `currency` table. The data in that column could be lost. The data in that column will be cast from `VarChar(200)` to `VarChar(100)`.
  - You are about to drop the column `currency_code` on the `pr_header` table. All the data in the column will be lost.
  - You are about to drop the column `currency_code` on the `vendor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[currency_code]` on the table `currency` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "vendor" DROP CONSTRAINT "vendor_currency_code_fkey";

-- AlterTable
ALTER TABLE "currency" DROP CONSTRAINT "currency_pkey",
ADD COLUMN     "currency_id" SERIAL NOT NULL,
ALTER COLUMN "currency_code" SET DATA TYPE VARCHAR(3),
ALTER COLUMN "currency_name" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "currency_nameeng" SET DATA TYPE VARCHAR(100),
ADD CONSTRAINT "currency_pkey" PRIMARY KEY ("currency_id");

-- AlterTable
ALTER TABLE "pr_header" DROP COLUMN "currency_code",
ADD COLUMN     "currency_id" INTEGER;

-- AlterTable
ALTER TABLE "vendor" DROP COLUMN "currency_code",
ADD COLUMN     "currency_id" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "currency_currency_code_key" ON "currency"("currency_code");

-- AddForeignKey
ALTER TABLE "vendor" ADD CONSTRAINT "vendor_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currency"("currency_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pr_header" ADD CONSTRAINT "pr_header_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currency"("currency_id") ON DELETE SET NULL ON UPDATE CASCADE;
