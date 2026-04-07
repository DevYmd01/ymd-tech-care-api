-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "bill_group_id" INTEGER;

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_bill_group_id_fkey" FOREIGN KEY ("bill_group_id") REFERENCES "bill_group"("bill_group_id") ON DELETE SET NULL ON UPDATE CASCADE;
