/*
  Warnings:

  - The primary key for the `currency` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `currency_id` on the `currency` table. All the data in the column will be lost.
  - You are about to alter the column `currency_code` on the `currency` table. The data in that column could be lost. The data in that column will be cast from `VarChar(30)` to `VarChar(10)`.
  - You are about to drop the column `currency_id` on the `vendor` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "vendor" DROP CONSTRAINT "vendor_currency_id_fkey";

-- AlterTable
ALTER TABLE "currency" DROP CONSTRAINT "currency_pkey",
DROP COLUMN "currency_id",
ALTER COLUMN "currency_code" SET DATA TYPE VARCHAR(10),
ADD CONSTRAINT "currency_pkey" PRIMARY KEY ("currency_code");

-- AlterTable
ALTER TABLE "vendor" DROP COLUMN "currency_id",
ADD COLUMN     "currency_code" VARCHAR(10);

-- AddForeignKey
ALTER TABLE "vendor" ADD CONSTRAINT "vendor_currency_code_fkey" FOREIGN KEY ("currency_code") REFERENCES "currency"("currency_code") ON DELETE SET NULL ON UPDATE CASCADE;
