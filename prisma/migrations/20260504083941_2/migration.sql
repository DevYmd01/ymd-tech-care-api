/*
  Warnings:

  - Added the required column `branch_id` to the `sale_order_approval_header` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_id` to the `sale_order_approval_header` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emp_dept_id` to the `sale_order_approval_header` table without a default value. This is not possible if the table is not empty.
  - Added the required column `onhold` to the `sale_order_approval_header` table without a default value. This is not possible if the table is not empty.
  - Added the required column `project_id` to the `sale_order_approval_header` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sale_area_id` to the `sale_order_approval_header` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status_remark` to the `sale_order_approval_header` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "sale_order_line" DROP CONSTRAINT "sale_order_line_location_id_fkey";

-- DropForeignKey
ALTER TABLE "sale_order_line" DROP CONSTRAINT "sale_order_line_warehouse_id_fkey";

-- DropForeignKey
ALTER TABLE "sale_reservation_line" DROP CONSTRAINT "sale_reservation_line_location_id_fkey";

-- DropForeignKey
ALTER TABLE "sale_reservation_line" DROP CONSTRAINT "sale_reservation_line_warehouse_id_fkey";

-- AlterTable
ALTER TABLE "sale_order_approval_header" ADD COLUMN     "branch_id" INTEGER NOT NULL,
ADD COLUMN     "customer_id" INTEGER NOT NULL,
ADD COLUMN     "emp_dept_id" INTEGER NOT NULL,
ADD COLUMN     "emp_sale_id" INTEGER,
ADD COLUMN     "onhold" TEXT NOT NULL,
ADD COLUMN     "payment_term_days" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "project_id" INTEGER NOT NULL,
ADD COLUMN     "sale_area_id" INTEGER NOT NULL,
ADD COLUMN     "ship_days" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "status_remark" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "sale_order_line" ALTER COLUMN "warehouse_id" DROP NOT NULL,
ALTER COLUMN "location_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "sale_reservation_line" ALTER COLUMN "warehouse_id" DROP NOT NULL,
ALTER COLUMN "location_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "sale_reservation_line" ADD CONSTRAINT "sale_reservation_line_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("warehouse_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_reservation_line" ADD CONSTRAINT "sale_reservation_line_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("location_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_line" ADD CONSTRAINT "sale_order_line_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("warehouse_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_line" ADD CONSTRAINT "sale_order_line_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("location_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_approval_header" ADD CONSTRAINT "sale_order_approval_header_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customer"("customer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_approval_header" ADD CONSTRAINT "sale_order_approval_header_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_approval_header" ADD CONSTRAINT "sale_order_approval_header_emp_sale_id_fkey" FOREIGN KEY ("emp_sale_id") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_approval_header" ADD CONSTRAINT "sale_order_approval_header_sale_area_id_fkey" FOREIGN KEY ("sale_area_id") REFERENCES "employee_sale_area"("sale_area_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_approval_header" ADD CONSTRAINT "sale_order_approval_header_emp_dept_id_fkey" FOREIGN KEY ("emp_dept_id") REFERENCES "employee_department"("emp_dept_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sale_order_approval_header" ADD CONSTRAINT "sale_order_approval_header_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;
