/*
  Warnings:

  - You are about to drop the column `created_at` on the `item_lot` table. All the data in the column will be lost.
  - You are about to drop the column `qty_available` on the `item_lot` table. All the data in the column will be lost.
  - You are about to drop the column `qty_issued` on the `item_lot` table. All the data in the column will be lost.
  - You are about to drop the column `qty_reserved` on the `item_lot` table. All the data in the column will be lost.
  - You are about to drop the column `qty_stock` on the `item_lot` table. All the data in the column will be lost.
  - You are about to drop the column `updated_at` on the `item_lot` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "item_lot" DROP CONSTRAINT "item_lot_supplier_vendor_id_fkey";

-- AlterTable
ALTER TABLE "item_lot" DROP COLUMN "created_at",
DROP COLUMN "qty_available",
DROP COLUMN "qty_issued",
DROP COLUMN "qty_reserved",
DROP COLUMN "qty_stock",
DROP COLUMN "updated_at",
ALTER COLUMN "lot_no" SET DATA TYPE TEXT,
ALTER COLUMN "supplier_vendor_id" DROP NOT NULL;

-- CreateTable
CREATE TABLE "item_stock_balance" (
    "stock_balance_id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "branch_id" INTEGER,
    "warehouse_id" INTEGER NOT NULL,
    "location_id" INTEGER,
    "qty_on_hand" DECIMAL(18,6) NOT NULL DEFAULT 0,
    "qty_reserved" DECIMAL(18,6) NOT NULL DEFAULT 0,
    "qty_available" DECIMAL(18,6) NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_stock_balance_pkey" PRIMARY KEY ("stock_balance_id")
);

-- CreateTable
CREATE TABLE "stock_transaction" (
    "stock_transaction_id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "branch_id" INTEGER,
    "warehouse_id" INTEGER NOT NULL,
    "location_id" INTEGER,
    "qty" DECIMAL(18,6) NOT NULL,
    "trans_type" TEXT NOT NULL,
    "ref_doc_type" TEXT,
    "ref_doc_no" TEXT,
    "ref_line_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stock_transaction_pkey" PRIMARY KEY ("stock_transaction_id")
);

-- CreateTable
CREATE TABLE "item_lot_balance" (
    "lot_balance_id" SERIAL NOT NULL,
    "lot_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "branch_id" INTEGER,
    "warehouse_id" INTEGER NOT NULL,
    "location_id" INTEGER,
    "qty_on_hand" DECIMAL(18,6) NOT NULL DEFAULT 0,
    "qty_reserved" DECIMAL(18,6) NOT NULL DEFAULT 0,
    "qty_available" DECIMAL(18,6) NOT NULL DEFAULT 0,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_lot_balance_pkey" PRIMARY KEY ("lot_balance_id")
);

-- CreateTable
CREATE TABLE "lot_transaction" (
    "lot_transaction_id" SERIAL NOT NULL,
    "lot_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "branch_id" INTEGER,
    "warehouse_id" INTEGER NOT NULL,
    "location_id" INTEGER,
    "qty" DECIMAL(18,6) NOT NULL,
    "trans_type" TEXT NOT NULL,
    "ref_doc_type" TEXT,
    "ref_doc_no" TEXT,
    "ref_line_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lot_transaction_pkey" PRIMARY KEY ("lot_transaction_id")
);

-- CreateIndex
CREATE INDEX "item_stock_balance_item_id_idx" ON "item_stock_balance"("item_id");

-- CreateIndex
CREATE INDEX "item_stock_balance_warehouse_id_idx" ON "item_stock_balance"("warehouse_id");

-- CreateIndex
CREATE UNIQUE INDEX "item_stock_balance_item_id_branch_id_warehouse_id_location__key" ON "item_stock_balance"("item_id", "branch_id", "warehouse_id", "location_id");

-- CreateIndex
CREATE INDEX "stock_transaction_item_id_idx" ON "stock_transaction"("item_id");

-- CreateIndex
CREATE INDEX "stock_transaction_warehouse_id_idx" ON "stock_transaction"("warehouse_id");

-- CreateIndex
CREATE INDEX "stock_transaction_ref_doc_type_ref_doc_no_idx" ON "stock_transaction"("ref_doc_type", "ref_doc_no");

-- CreateIndex
CREATE INDEX "item_lot_balance_item_id_idx" ON "item_lot_balance"("item_id");

-- CreateIndex
CREATE INDEX "item_lot_balance_warehouse_id_idx" ON "item_lot_balance"("warehouse_id");

-- CreateIndex
CREATE UNIQUE INDEX "item_lot_balance_lot_id_warehouse_id_location_id_key" ON "item_lot_balance"("lot_id", "warehouse_id", "location_id");

-- CreateIndex
CREATE INDEX "lot_transaction_lot_id_idx" ON "lot_transaction"("lot_id");

-- CreateIndex
CREATE INDEX "lot_transaction_item_id_idx" ON "lot_transaction"("item_id");

-- CreateIndex
CREATE INDEX "lot_transaction_warehouse_id_idx" ON "lot_transaction"("warehouse_id");

-- CreateIndex
CREATE INDEX "lot_transaction_ref_doc_type_ref_doc_no_idx" ON "lot_transaction"("ref_doc_type", "ref_doc_no");

-- AddForeignKey
ALTER TABLE "item_stock_balance" ADD CONSTRAINT "item_stock_balance_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_stock_balance" ADD CONSTRAINT "item_stock_balance_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_stock_balance" ADD CONSTRAINT "item_stock_balance_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("warehouse_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_stock_balance" ADD CONSTRAINT "item_stock_balance_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("location_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_transaction" ADD CONSTRAINT "stock_transaction_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_transaction" ADD CONSTRAINT "stock_transaction_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_transaction" ADD CONSTRAINT "stock_transaction_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("warehouse_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_transaction" ADD CONSTRAINT "stock_transaction_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("location_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_lot" ADD CONSTRAINT "item_lot_supplier_vendor_id_fkey" FOREIGN KEY ("supplier_vendor_id") REFERENCES "vendor"("vendor_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_lot_balance" ADD CONSTRAINT "item_lot_balance_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "item_lot"("lot_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_lot_balance" ADD CONSTRAINT "item_lot_balance_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_lot_balance" ADD CONSTRAINT "item_lot_balance_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_lot_balance" ADD CONSTRAINT "item_lot_balance_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("warehouse_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_lot_balance" ADD CONSTRAINT "item_lot_balance_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("location_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lot_transaction" ADD CONSTRAINT "lot_transaction_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "item_lot"("lot_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lot_transaction" ADD CONSTRAINT "lot_transaction_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lot_transaction" ADD CONSTRAINT "lot_transaction_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lot_transaction" ADD CONSTRAINT "lot_transaction_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("warehouse_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lot_transaction" ADD CONSTRAINT "lot_transaction_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("location_id") ON DELETE SET NULL ON UPDATE CASCADE;
