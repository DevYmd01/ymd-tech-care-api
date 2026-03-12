-- AlterTable
ALTER TABLE "item" ADD COLUMN     "item_color_code" VARCHAR(20),
ADD COLUMN     "item_color_id" INTEGER;

-- CreateTable
CREATE TABLE "item_color" (
    "item_color_id" SERIAL NOT NULL,
    "item_color_code" VARCHAR(30) NOT NULL,
    "item_color_name" VARCHAR(200) NOT NULL,
    "item_color_nameeng" VARCHAR(200),
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_color_pkey" PRIMARY KEY ("item_color_id")
);

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_item_color_id_fkey" FOREIGN KEY ("item_color_id") REFERENCES "item_color"("item_color_id") ON DELETE SET NULL ON UPDATE CASCADE;
