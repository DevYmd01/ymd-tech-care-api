/*
  Warnings:

  - You are about to drop the column `approved_qty` on the `issue_stock_line` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "issue_stock_line" DROP COLUMN "approved_qty";
