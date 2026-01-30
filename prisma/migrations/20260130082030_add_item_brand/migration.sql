-- AlterTable
ALTER TABLE "item" ADD COLUMN     "brand_id" INTEGER;

-- CreateTable
CREATE TABLE "item_brand" (
    "item_brand_id" SERIAL NOT NULL,
    "item_brand_code" VARCHAR(30) NOT NULL,
    "item_brand_name" VARCHAR(200) NOT NULL,
    "item_brand_nameeng" VARCHAR(200) NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_brand_pkey" PRIMARY KEY ("item_brand_id")
);

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_brand_id_fkey" FOREIGN KEY ("brand_id") REFERENCES "item_brand"("item_brand_id") ON DELETE SET NULL ON UPDATE CASCADE;
