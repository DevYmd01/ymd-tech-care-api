-- AlterTable
ALTER TABLE "item_uom" ADD COLUMN     "customer_id" INTEGER,
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "item_uom" ADD CONSTRAINT "item_uom_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE SET NULL ON UPDATE CASCADE;
