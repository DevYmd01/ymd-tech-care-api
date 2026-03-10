-- AlterTable
ALTER TABLE "item" ADD COLUMN     "item_brandItem_brand_id" INTEGER,
ADD COLUMN     "item_patternItem_pattern_id" INTEGER;

-- AlterTable
ALTER TABLE "item_category" ALTER COLUMN "item_category_nameeng" DROP NOT NULL;

-- AlterTable
ALTER TABLE "pr_line" ADD COLUMN     "item_brandItem_brand_id" INTEGER;

-- AlterTable
ALTER TABLE "rfq_line" ADD COLUMN     "item_brandItem_brand_id" INTEGER;

-- CreateTable
CREATE TABLE "item_brand" (
    "item_brand_id" SERIAL NOT NULL,
    "item_brand_code" VARCHAR(30) NOT NULL,
    "item_brand_name" VARCHAR(200) NOT NULL,
    "item_brand_nameeng" VARCHAR(200) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_brand_pkey" PRIMARY KEY ("item_brand_id")
);

-- CreateTable
CREATE TABLE "item_pattern" (
    "item_pattern_id" SERIAL NOT NULL,
    "item_pattern_code" VARCHAR(30) NOT NULL,
    "item_pattern_name" VARCHAR(200) NOT NULL,
    "item_pattern_nameeng" VARCHAR(200) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_pattern_pkey" PRIMARY KEY ("item_pattern_id")
);

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_item_brandItem_brand_id_fkey" FOREIGN KEY ("item_brandItem_brand_id") REFERENCES "item_brand"("item_brand_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_item_patternItem_pattern_id_fkey" FOREIGN KEY ("item_patternItem_pattern_id") REFERENCES "item_pattern"("item_pattern_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pr_line" ADD CONSTRAINT "pr_line_item_brandItem_brand_id_fkey" FOREIGN KEY ("item_brandItem_brand_id") REFERENCES "item_brand"("item_brand_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rfq_line" ADD CONSTRAINT "rfq_line_item_brandItem_brand_id_fkey" FOREIGN KEY ("item_brandItem_brand_id") REFERENCES "item_brand"("item_brand_id") ON DELETE SET NULL ON UPDATE CASCADE;
