-- AlterTable
ALTER TABLE "item_lot_balance" ADD COLUMN     "qty_booked" DECIMAL(18,6) NOT NULL DEFAULT 0,
ADD COLUMN     "qty_pending_issue" DECIMAL(18,6) NOT NULL DEFAULT 0,
ADD COLUMN     "qty_so_allocated" DECIMAL(18,6) NOT NULL DEFAULT 0;
