/*
  Warnings:

  - You are about to drop the column `status` on the `vendor` table. All the data in the column will be lost.
  - Added the required column `receive_contact` to the `receive_place` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `currency_code` to the `vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_active` to the `vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vat_registered` to the `vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendor_group_id` to the `vendor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vendor_type_id` to the `vendor` table without a default value. This is not possible if the table is not empty.
  - Made the column `tax_id` on table `vendor` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "receive_place" ADD COLUMN     "receive_contact" VARCHAR(200) NOT NULL;

-- AlterTable
ALTER TABLE "vendor" DROP COLUMN "status",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currency_code" VARCHAR(3) NOT NULL,
ADD COLUMN     "email" VARCHAR(255) NOT NULL,
ADD COLUMN     "is_active" BOOLEAN NOT NULL,
ADD COLUMN     "phone" VARCHAR(20) NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "vat_registered" BOOLEAN NOT NULL,
ADD COLUMN     "vendor_group_id" INTEGER NOT NULL,
ADD COLUMN     "vendor_type_id" INTEGER NOT NULL,
ALTER COLUMN "tax_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "vendor" ADD CONSTRAINT "vendor_vendor_type_id_fkey" FOREIGN KEY ("vendor_type_id") REFERENCES "vendor_type"("vendor_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vendor" ADD CONSTRAINT "vendor_vendor_group_id_fkey" FOREIGN KEY ("vendor_group_id") REFERENCES "vendor_group"("vendor_group_id") ON DELETE RESTRICT ON UPDATE CASCADE;
