-- CreateTable
CREATE TABLE "item_barcode" (
    "item_barcode_id" SERIAL NOT NULL,
    "item_barcode_code" VARCHAR(30) NOT NULL,
    "item_id" INTEGER NOT NULL,
    "uom_id" INTEGER NOT NULL,
    "is_primary" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_barcode_pkey" PRIMARY KEY ("item_barcode_id")
);

-- AddForeignKey
ALTER TABLE "item_barcode" ADD CONSTRAINT "item_barcode_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("item_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_barcode" ADD CONSTRAINT "item_barcode_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "uom"("uom_id") ON DELETE RESTRICT ON UPDATE CASCADE;
