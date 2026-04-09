-- CreateTable
CREATE TABLE "multi_price_item" (
    "multi_price_item_id" SERIAL NOT NULL,
    "item_from_qty" DECIMAL(65,30) NOT NULL DEFAULT 0,
    "item_id" INTEGER NOT NULL,
    "item_price1" DECIMAL(18,2),
    "item_price2" DECIMAL(18,2),
    "item_price3" DECIMAL(18,2),
    "item_price4" DECIMAL(18,2),
    "item_price5" DECIMAL(18,2),
    "item_price6" DECIMAL(18,2),
    "item_price7" DECIMAL(18,2),
    "item_price8" DECIMAL(18,2),
    "item_price9" DECIMAL(18,2),
    "item_price10" DECIMAL(18,2),
    "item_to_qty" DECIMAL(65,30) DEFAULT 0,
    "uom_id" INTEGER NOT NULL,

    CONSTRAINT "multi_price_item_pkey" PRIMARY KEY ("multi_price_item_id")
);

-- AddForeignKey
ALTER TABLE "multi_price_item" ADD CONSTRAINT "multi_price_item_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "multi_price_item" ADD CONSTRAINT "multi_price_item_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "uom"("uom_id") ON DELETE RESTRICT ON UPDATE CASCADE;
