-- CreateEnum
CREATE TYPE "EmployeeAddressType" AS ENUM ('REGISTERED', 'CONTACT', 'BILLING', 'SHIPPING');

-- CreateTable
CREATE TABLE "employees" (
    "employee_id" SERIAL NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "employee_code" VARCHAR(20) NOT NULL,
    "employee_title_th" VARCHAR(20) NOT NULL,
    "employee_title_en" VARCHAR(20) NOT NULL,
    "employee_firstname_th" VARCHAR(200) NOT NULL,
    "employee_lastname_th" VARCHAR(200) NOT NULL,
    "employee_firstname_en" VARCHAR(200) NOT NULL,
    "employee_lastname_en" VARCHAR(200) NOT NULL,
    "employee_fullname" VARCHAR(400) NOT NULL,
    "employee_startdate" TIMESTAMP(3) NOT NULL,
    "employee_resigndate" TIMESTAMP(3),
    "employee_status" VARCHAR(20) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "remark" TEXT,
    "tax_id" VARCHAR(20),
    "emp_type" BOOLEAN NOT NULL DEFAULT false,
    "position_id" INTEGER NOT NULL,
    "department_id" INTEGER NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "manager_employee_id" INTEGER,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "employees_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "employee_address" (
    "employee_address_id" SERIAL NOT NULL,
    "employee_id" INTEGER NOT NULL,
    "address_type" "EmployeeAddressType" NOT NULL,
    "address" TEXT NOT NULL,
    "district" VARCHAR(100),
    "province" VARCHAR(100),
    "postal_code" VARCHAR(10),
    "country" VARCHAR(100) NOT NULL,
    "contact_person" VARCHAR(255),

    CONSTRAINT "employee_address_pkey" PRIMARY KEY ("employee_address_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employees_employee_code_key" ON "employees"("employee_code");

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_position_id_fkey" FOREIGN KEY ("position_id") REFERENCES "org_position"("position_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "org_department"("department_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employees" ADD CONSTRAINT "employees_manager_employee_id_fkey" FOREIGN KEY ("manager_employee_id") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;
