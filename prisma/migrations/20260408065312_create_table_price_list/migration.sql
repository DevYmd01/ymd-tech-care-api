-- CreateTable
CREATE TABLE "standard_cost_header" (
    "standard_cost_header_id" SERIAL NOT NULL,
    "standard_cost_code" VARCHAR(30) NOT NULL,
    "standard_cost_name" VARCHAR(200) NOT NULL,
    "standard_cost_date" DATE NOT NULL,
    "remark" VARCHAR(500),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "item_brand_id" INTEGER,
    "item_id" INTEGER,
    "permit_emp_id" INTEGER,
    "save_emp_id" INTEGER,
    "document_date" DATE,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "standard_cost_header_pkey" PRIMARY KEY ("standard_cost_header_id")
);

-- CreateTable
CREATE TABLE "standard_cost_line" (
    "standard_cost_line_id" SERIAL NOT NULL,
    "standard_cost_header_id" INTEGER NOT NULL,
    "remarks" VARCHAR(500),
    "item_name" VARCHAR(200),
    "item_id" INTEGER,
    "uom_id" INTEGER,
    "standard_buy_price" DECIMAL(18,2),
    "standard_cost" DECIMAL(18,2),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "standard_cost_line_pkey" PRIMARY KEY ("standard_cost_line_id")
);

-- CreateTable
CREATE TABLE "price_list_header" (
    "price_list_header_id" SERIAL NOT NULL,
    "price_list_no" VARCHAR(30) NOT NULL,
    "price_list_code" VARCHAR(30) NOT NULL,
    "price_list_name" VARCHAR(200) NOT NULL,
    "price_list_date" DATE NOT NULL,
    "remark" VARCHAR(500),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "begin_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "branch_id" INTEGER,
    "changed_date" DATE,
    "customer_group_id" INTEGER,
    "customer_id" INTEGER,
    "emp_dept_id" INTEGER,
    "item_brand_id" INTEGER,
    "item_id" INTEGER,
    "permit_emp_id" INTEGER,
    "save_emp_id" INTEGER,
    "document_date" DATE,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "price_list_header_pkey" PRIMARY KEY ("price_list_header_id")
);

-- CreateTable
CREATE TABLE "price_list_item_line" (
    "price_list_item_id" SERIAL NOT NULL,
    "price_list_header_id" INTEGER NOT NULL,
    "remarks" VARCHAR(500),
    "item_id" INTEGER,
    "uom_id" INTEGER,
    "unit_price" DECIMAL(18,2),
    "line_discount_rate" VARCHAR(30),
    "line_discount_amount" DECIMAL(18,2),
    "unit_price_net" DECIMAL(18,2),
    "editflag" VARCHAR(20),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "price_list_flag" VARCHAR(20),

    CONSTRAINT "price_list_item_line_pkey" PRIMARY KEY ("price_list_item_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "standard_cost_header_standard_cost_code_key" ON "standard_cost_header"("standard_cost_code");

-- CreateIndex
CREATE UNIQUE INDEX "price_list_header_price_list_no_key" ON "price_list_header"("price_list_no");

-- CreateIndex
CREATE UNIQUE INDEX "price_list_header_price_list_code_key" ON "price_list_header"("price_list_code");

-- AddForeignKey
ALTER TABLE "standard_cost_header" ADD CONSTRAINT "standard_cost_header_item_brand_id_fkey" FOREIGN KEY ("item_brand_id") REFERENCES "item_brand"("item_brand_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "standard_cost_header" ADD CONSTRAINT "standard_cost_header_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("item_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "standard_cost_header" ADD CONSTRAINT "standard_cost_header_permit_emp_id_fkey" FOREIGN KEY ("permit_emp_id") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "standard_cost_header" ADD CONSTRAINT "standard_cost_header_save_emp_id_fkey" FOREIGN KEY ("save_emp_id") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "standard_cost_line" ADD CONSTRAINT "standard_cost_line_standard_cost_header_id_fkey" FOREIGN KEY ("standard_cost_header_id") REFERENCES "standard_cost_header"("standard_cost_header_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "standard_cost_line" ADD CONSTRAINT "standard_cost_line_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("item_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "standard_cost_line" ADD CONSTRAINT "standard_cost_line_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "uom"("uom_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_list_header" ADD CONSTRAINT "price_list_header_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_list_header" ADD CONSTRAINT "price_list_header_customer_group_id_fkey" FOREIGN KEY ("customer_group_id") REFERENCES "customer_group"("customer_group_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_list_header" ADD CONSTRAINT "price_list_header_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_list_header" ADD CONSTRAINT "price_list_header_emp_dept_id_fkey" FOREIGN KEY ("emp_dept_id") REFERENCES "employee_department"("emp_dept_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_list_header" ADD CONSTRAINT "price_list_header_item_brand_id_fkey" FOREIGN KEY ("item_brand_id") REFERENCES "item_brand"("item_brand_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_list_header" ADD CONSTRAINT "price_list_header_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("item_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_list_header" ADD CONSTRAINT "price_list_header_permit_emp_id_fkey" FOREIGN KEY ("permit_emp_id") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_list_header" ADD CONSTRAINT "price_list_header_save_emp_id_fkey" FOREIGN KEY ("save_emp_id") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_list_item_line" ADD CONSTRAINT "price_list_item_line_price_list_header_id_fkey" FOREIGN KEY ("price_list_header_id") REFERENCES "price_list_header"("price_list_header_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_list_item_line" ADD CONSTRAINT "price_list_item_line_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("item_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "price_list_item_line" ADD CONSTRAINT "price_list_item_line_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "uom"("uom_id") ON DELETE SET NULL ON UPDATE CASCADE;
