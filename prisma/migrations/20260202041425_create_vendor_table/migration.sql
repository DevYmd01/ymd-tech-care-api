-- AlterTable
ALTER TABLE "item" ADD COLUMN     "item_designItem_design_id" INTEGER;

-- CreateTable
CREATE TABLE "item_design" (
    "item_design_id" SERIAL NOT NULL,
    "item_design_code" VARCHAR(30) NOT NULL,
    "item_design_name" VARCHAR(200) NOT NULL,
    "item_design_nameeng" VARCHAR(200),
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_design_pkey" PRIMARY KEY ("item_design_id")
);

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_item_designItem_design_id_fkey" FOREIGN KEY ("item_designItem_design_id") REFERENCES "item_design"("item_design_id") ON DELETE SET NULL ON UPDATE CASCADE;
