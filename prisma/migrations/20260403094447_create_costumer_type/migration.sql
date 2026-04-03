/*
  Warnings:

  - A unique constraint covering the columns `[emp_id,period_id]` on the table `employee_sale_target` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "customer_type" (
    "customer_type_id" SERIAL NOT NULL,
    "customer_type_code" VARCHAR(30) NOT NULL,
    "customer_type_name" VARCHAR(200) NOT NULL,
    "customer_type_nameeng" VARCHAR(200),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_type_pkey" PRIMARY KEY ("customer_type_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_type_customer_type_code_key" ON "customer_type"("customer_type_code");

-- CreateIndex
CREATE UNIQUE INDEX "employee_sale_target_emp_id_period_id_key" ON "employee_sale_target"("emp_id", "period_id");
