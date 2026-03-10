-- AlterTable
ALTER TABLE "item" ADD COLUMN     "item_categoryItem_category_id" INTEGER;

-- AlterTable
ALTER TABLE "pr_line" ADD COLUMN     "item_categoryItem_category_id" INTEGER;

-- CreateTable
CREATE TABLE "item_category" (
    "item_category_id" SERIAL NOT NULL,
    "item_category_code" VARCHAR(30) NOT NULL,
    "item_category_name" VARCHAR(200) NOT NULL,
    "item_category_nameeng" VARCHAR(200) NOT NULL,
    "is_active" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_category_pkey" PRIMARY KEY ("item_category_id")
);

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_item_categoryItem_category_id_fkey" FOREIGN KEY ("item_categoryItem_category_id") REFERENCES "item_category"("item_category_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pr_line" ADD CONSTRAINT "pr_line_item_categoryItem_category_id_fkey" FOREIGN KEY ("item_categoryItem_category_id") REFERENCES "item_category"("item_category_id") ON DELETE SET NULL ON UPDATE CASCADE;
