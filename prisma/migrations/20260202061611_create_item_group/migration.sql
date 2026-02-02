-- AlterTable
ALTER TABLE "item" ADD COLUMN     "item_groupItem_group_id" INTEGER;

-- CreateTable
CREATE TABLE "item_group" (
    "item_group_id" SERIAL NOT NULL,
    "item_group_code" VARCHAR(30) NOT NULL,
    "item_group_name" VARCHAR(200) NOT NULL,
    "item_group_nameeng" VARCHAR(200),
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_group_pkey" PRIMARY KEY ("item_group_id")
);

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_item_groupItem_group_id_fkey" FOREIGN KEY ("item_groupItem_group_id") REFERENCES "item_group"("item_group_id") ON DELETE SET NULL ON UPDATE CASCADE;
