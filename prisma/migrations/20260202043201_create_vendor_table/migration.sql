-- AlterTable
ALTER TABLE "item" ADD COLUMN     "item_classItem_class_id" INTEGER;

-- CreateTable
CREATE TABLE "item_class" (
    "item_class_id" SERIAL NOT NULL,
    "item_class_code" VARCHAR(30) NOT NULL,
    "item_class_name" VARCHAR(200) NOT NULL,
    "item_class_nameeng" VARCHAR(200),
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_class_pkey" PRIMARY KEY ("item_class_id")
);

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_item_classItem_class_id_fkey" FOREIGN KEY ("item_classItem_class_id") REFERENCES "item_class"("item_class_id") ON DELETE SET NULL ON UPDATE CASCADE;
