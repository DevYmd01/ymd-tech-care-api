-- AlterTable
ALTER TABLE "customer" ADD COLUMN     "price_level_id" INTEGER;

-- CreateTable
CREATE TABLE "price_level" (
    "id" SERIAL NOT NULL,
    "code" VARCHAR(20) NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "level_no" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "price_level_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "price_level_code_key" ON "price_level"("code");

-- CreateIndex
CREATE UNIQUE INDEX "price_level_level_no_key" ON "price_level"("level_no");

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_price_level_id_fkey" FOREIGN KEY ("price_level_id") REFERENCES "price_level"("id") ON DELETE SET NULL ON UPDATE CASCADE;
