/*
  Warnings:

  - Added the required column `status` to the `sale_order_approval_line` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sale_order_approval_line" ADD COLUMN     "status" VARCHAR(20) NOT NULL;
