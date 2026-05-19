-- CreateTable
CREATE TABLE "stock_ledger" (
    "stock_ledger_id" SERIAL NOT NULL,
    "item_id" INTEGER NOT NULL,
    "warehouse_id" INTEGER,
    "location_id" INTEGER,
    "lot_id" INTEGER,
    "document_type" TEXT NOT NULL,
    "reference_no" TEXT,
    "qty_in" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "qty_out" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "balance_on_hand" DECIMAL(65,30) NOT NULL,
    "balance_reserved" DECIMAL(65,30) NOT NULL,
    "balance_available" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "stock_ledger_pkey" PRIMARY KEY ("stock_ledger_id")
);

-- CreateTable
CREATE TABLE "lot_stock_ledger" (
    "id" SERIAL NOT NULL,
    "lot_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "warehouse_id" INTEGER,
    "location_id" INTEGER,
    "document_type" TEXT NOT NULL,
    "reference_no" TEXT,
    "qty" DECIMAL(65,30) NOT NULL,
    "balance_on_hand" DECIMAL(65,30) NOT NULL,
    "balance_reserved" DECIMAL(65,30) NOT NULL,
    "balance_available" DECIMAL(65,30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lot_stock_ledger_pkey" PRIMARY KEY ("id")
);
