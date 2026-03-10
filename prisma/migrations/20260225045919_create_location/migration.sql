-- CreateTable
CREATE TABLE "location" (
    "location_id" SERIAL NOT NULL,
    "warehouse_id" INTEGER NOT NULL,
    "location_code" VARCHAR(20) NOT NULL,
    "location_name" VARCHAR(200) NOT NULL,
    "location_nameeng" VARCHAR(200) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("location_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "location_location_code_key" ON "location"("location_code");

-- AddForeignKey
ALTER TABLE "location" ADD CONSTRAINT "location_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("warehouse_id") ON DELETE RESTRICT ON UPDATE CASCADE;
