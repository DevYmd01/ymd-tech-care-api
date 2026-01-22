-- AlterTable
ALTER TABLE "item" ADD COLUMN     "item_typeItem_type_id" INTEGER;

-- CreateTable
CREATE TABLE "item_type" (
    "item_type_id" SERIAL NOT NULL,
    "item_type_code" VARCHAR(30) NOT NULL,
    "item_type_name" VARCHAR(200) NOT NULL,
    "item_type_nameeng" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_type_pkey" PRIMARY KEY ("item_type_id")
);

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_item_typeItem_type_id_fkey" FOREIGN KEY ("item_typeItem_type_id") REFERENCES "item_type"("item_type_id") ON DELETE SET NULL ON UPDATE CASCADE;
