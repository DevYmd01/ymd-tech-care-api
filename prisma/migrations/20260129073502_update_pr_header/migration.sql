/*
  Warnings:

  - Added the required column `requester_user_id` to the `pr_header` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pr_header" ADD COLUMN     "credit_days" INTEGER,
ADD COLUMN     "delivery_date" TIMESTAMP(3),
ADD COLUMN     "preferred_vendor" VARCHAR(100),
ADD COLUMN     "requester_name" VARCHAR(100),
ADD COLUMN     "requester_user_id" INTEGER NOT NULL,
ADD COLUMN     "shipping_method" VARCHAR(50),
ADD COLUMN     "vendor_quote_no" VARCHAR(50);

-- AddForeignKey
ALTER TABLE "pr_header" ADD CONSTRAINT "pr_header_requester_user_id_fkey" FOREIGN KEY ("requester_user_id") REFERENCES "employees"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;
