/*
  Warnings:

  - You are about to drop the `quote_compare_header` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "quote_compare_header" DROP CONSTRAINT "quote_compare_header_pr_id_fkey";

-- DropTable
DROP TABLE "quote_compare_header";
