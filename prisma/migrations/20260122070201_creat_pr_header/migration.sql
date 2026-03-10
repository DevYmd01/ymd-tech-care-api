/*
  Warnings:

  - You are about to drop the column `request_date` on the `pr_header` table. All the data in the column will be lost.
  - You are about to drop the column `required_date` on the `pr_header` table. All the data in the column will be lost.
  - Added the required column `currency_code` to the `pr_header` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exchange_rate` to the `pr_header` table without a default value. This is not possible if the table is not empty.
  - Added the required column `need_by_date` to the `pr_header` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pr_date` to the `pr_header` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `pr_header` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warehouse_id` to the `pr_header` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pr_header" DROP COLUMN "request_date",
DROP COLUMN "required_date",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "currency_code" VARCHAR(3) NOT NULL,
ADD COLUMN     "exchange_rate" DECIMAL(18,2) NOT NULL,
ADD COLUMN     "need_by_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "payment_term_days" INTEGER,
ADD COLUMN     "pr_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "remark" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "warehouse_id" INTEGER NOT NULL;
