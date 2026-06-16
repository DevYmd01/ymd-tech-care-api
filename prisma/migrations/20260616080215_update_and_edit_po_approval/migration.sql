/*
  Warnings:

  - You are about to alter the column `status` on the `approval_po_line` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.

*/
-- AlterTable
ALTER TABLE "approval_po_line" ADD COLUMN     "receipt_qty" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "rejected_qty" DECIMAL(65,30) NOT NULL DEFAULT 0,
ADD COLUMN     "remaining_qty" DECIMAL(65,30) NOT NULL DEFAULT 0,
ALTER COLUMN "status" SET DEFAULT 'PENDING',
ALTER COLUMN "status" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "po_approval" ADD COLUMN     "receipt_status" VARCHAR(20) NOT NULL DEFAULT 'PENDING';
