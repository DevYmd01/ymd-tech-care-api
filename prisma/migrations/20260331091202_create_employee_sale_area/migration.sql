-- CreateTable
CREATE TABLE "employee_sale_area" (
    "sale_area_id" SERIAL NOT NULL,
    "sale_area_code" VARCHAR(30) NOT NULL,
    "sale_area_name" VARCHAR(200) NOT NULL,
    "sale_area_nameeng" VARCHAR(200),
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "employee_sale_area_pkey" PRIMARY KEY ("sale_area_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employee_sale_area_sale_area_code_key" ON "employee_sale_area"("sale_area_code");
