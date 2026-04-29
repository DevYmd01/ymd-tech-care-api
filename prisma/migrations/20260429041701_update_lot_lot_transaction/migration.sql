/*
  Warnings:

  - Made the column `location_id` on table `item_lot_balance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `location_id` on table `lot_transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "item_lot_balance" DROP CONSTRAINT "item_lot_balance_location_id_fkey";

-- DropForeignKey
ALTER TABLE "lot_transaction" DROP CONSTRAINT "lot_transaction_location_id_fkey";

-- AlterTable
ALTER TABLE "item_lot_balance" ALTER COLUMN "location_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "lot_transaction" ALTER COLUMN "location_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "item_lot_balance" ADD CONSTRAINT "item_lot_balance_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lot_transaction" ADD CONSTRAINT "lot_transaction_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;
