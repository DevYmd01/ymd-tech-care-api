/*
  Warnings:

  - You are about to drop the column `status` on the `tax_group` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tax_code" ADD COLUMN     "tax_group_id" INTEGER;

-- AlterTable
ALTER TABLE "tax_group" DROP COLUMN "status",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE "tax_code" ADD CONSTRAINT "tax_code_tax_group_id_fkey" FOREIGN KEY ("tax_group_id") REFERENCES "tax_group"("tax_group_id") ON DELETE SET NULL ON UPDATE CASCADE;
