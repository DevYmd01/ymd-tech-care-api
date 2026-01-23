/*
  Warnings:

  - You are about to drop the column `total_amount` on the `pr_header` table. All the data in the column will be lost.
  - Added the required column `total_est_amount` to the `pr_header` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pr_header" DROP COLUMN "total_amount",
ADD COLUMN     "total_est_amount" DECIMAL(18,2) NOT NULL;
