-- AlterTable
ALTER TABLE "location" ADD COLUMN     "shelf_id" INTEGER;

-- CreateTable
CREATE TABLE "shelf" (
    "shelf_id" SERIAL NOT NULL,
    "shelf_code" VARCHAR(20) NOT NULL,
    "shelf_name" VARCHAR(200) NOT NULL,
    "shelf_nameeng" VARCHAR(200),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "shelf_pkey" PRIMARY KEY ("shelf_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shelf_shelf_code_key" ON "shelf"("shelf_code");

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_shelf_id_fkey" FOREIGN KEY ("shelf_id") REFERENCES "shelf"("shelf_id") ON DELETE SET NULL ON UPDATE CASCADE;
