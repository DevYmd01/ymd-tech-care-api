-- AlterTable
ALTER TABLE "item" ADD COLUMN     "item_sizeItem_size_id" INTEGER;

-- CreateTable
CREATE TABLE "item_size" (
    "item_size_id" SERIAL NOT NULL,
    "item_size_code" VARCHAR(30) NOT NULL,
    "item_size_name" VARCHAR(200) NOT NULL,
    "item_size_nameeng" VARCHAR(200),
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_size_pkey" PRIMARY KEY ("item_size_id")
);

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_item_sizeItem_size_id_fkey" FOREIGN KEY ("item_sizeItem_size_id") REFERENCES "item_size"("item_size_id") ON DELETE SET NULL ON UPDATE CASCADE;
