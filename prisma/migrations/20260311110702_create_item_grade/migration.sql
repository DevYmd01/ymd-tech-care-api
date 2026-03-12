-- AlterTable
ALTER TABLE "item" ADD COLUMN     "item_grade_code" VARCHAR(20),
ADD COLUMN     "item_grade_id" INTEGER;

-- CreateTable
CREATE TABLE "item_grade" (
    "item_grade_id" SERIAL NOT NULL,
    "item_grade_code" VARCHAR(30) NOT NULL,
    "item_grade_name" VARCHAR(200) NOT NULL,
    "item_grade_nameeng" VARCHAR(200),
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "item_grade_pkey" PRIMARY KEY ("item_grade_id")
);

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_item_grade_id_fkey" FOREIGN KEY ("item_grade_id") REFERENCES "item_grade"("item_grade_id") ON DELETE SET NULL ON UPDATE CASCADE;
