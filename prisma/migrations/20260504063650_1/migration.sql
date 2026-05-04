/*
  Warnings:

  - You are about to drop the column `status` on the `sale_order_approval_line` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sale_order_approval_line" DROP COLUMN "status";

-- AlterTable
ALTER TABLE "sale_order_line" ADD COLUMN     "status" VARCHAR(20) NOT NULL DEFAULT 'PENDING';
