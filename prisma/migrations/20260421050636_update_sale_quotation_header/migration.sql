/*
  Warnings:

  - You are about to drop the column `emp_area_id` on the `sq_header` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "sq_header" DROP CONSTRAINT "sq_header_emp_area_id_fkey";

-- AlterTable
ALTER TABLE "sq_header" DROP COLUMN "emp_area_id",
ADD COLUMN     "emp_sale_id" INTEGER,
ADD COLUMN     "sale_area_id" INTEGER;

-- CreateTable
CREATE TABLE "sale_reservation_header" (
    "reservation_id" SERIAL NOT NULL,
    "reservation_no" TEXT NOT NULL,
    "reservation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lead_id" INTEGER NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "ship_days" INTEGER NOT NULL,
    "remarks" TEXT NOT NULL,
    "payment_term_days" INTEGER NOT NULL,
    "onhold" TEXT NOT NULL,
    "emp_area_id" INTEGER NOT NULL,
    "emp_dept_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "status_remark" TEXT NOT NULL,

    CONSTRAINT "sale_reservation_header_pkey" PRIMARY KEY ("reservation_id")
);

-- CreateTable
CREATE TABLE "item_lot" (
    "lot_id" SERIAL NOT NULL,
    "lot_no" VARCHAR(30) NOT NULL,
    "item_id" INTEGER NOT NULL,

    CONSTRAINT "item_lot_pkey" PRIMARY KEY ("lot_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "sale_reservation_header_reservation_no_key" ON "sale_reservation_header"("reservation_no");

-- CreateIndex
CREATE UNIQUE INDEX "item_lot_lot_no_key" ON "item_lot"("lot_no");

-- AddForeignKey
ALTER TABLE "sq_header" ADD CONSTRAINT "sq_header_emp_sale_id_fkey" FOREIGN KEY ("emp_sale_id") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sq_header" ADD CONSTRAINT "sq_header_sale_area_id_fkey" FOREIGN KEY ("sale_area_id") REFERENCES "employee_sale_area"("sale_area_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_reservation_header" ADD CONSTRAINT "sale_reservation_header_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_reservation_header" ADD CONSTRAINT "sale_reservation_header_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_reservation_header" ADD CONSTRAINT "sale_reservation_header_emp_area_id_fkey" FOREIGN KEY ("emp_area_id") REFERENCES "employees"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_reservation_header" ADD CONSTRAINT "sale_reservation_header_emp_dept_id_fkey" FOREIGN KEY ("emp_dept_id") REFERENCES "employee_department"("emp_dept_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_reservation_header" ADD CONSTRAINT "sale_reservation_header_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;
