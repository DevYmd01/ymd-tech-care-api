/*
  Warnings:

  - You are about to drop the column `po_header_id` on the `grn_header` table. All the data in the column will be lost.
  - You are about to drop the column `received_by` on the `grn_header` table. All the data in the column will be lost.
  - You are about to drop the column `warehouse_id` on the `grn_header` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `grn_line` table. All the data in the column will be lost.
  - You are about to drop the column `pr_line_id` on the `grn_line` table. All the data in the column will be lost.
  - Added the required column `location_id` to the `grn_line` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lot_balance_id` to the `grn_line` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lot_id` to the `grn_line` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `grn_line` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warehouse_id` to the `grn_line` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "grn_header" DROP CONSTRAINT "grn_header_po_header_id_fkey";

-- DropForeignKey
ALTER TABLE "grn_header" DROP CONSTRAINT "grn_header_received_by_fkey";

-- DropForeignKey
ALTER TABLE "grn_header" DROP CONSTRAINT "grn_header_warehouse_id_fkey";

-- AlterTable
ALTER TABLE "grn_header" DROP COLUMN "po_header_id",
DROP COLUMN "received_by",
DROP COLUMN "warehouse_id",
ADD COLUMN     "created_by_id" INTEGER,
ADD COLUMN     "emp_dept_id" INTEGER,
ADD COLUMN     "po_approval_id" INTEGER,
ADD COLUMN     "project_id" INTEGER,
ADD COLUMN     "received_by_id" INTEGER;

-- AlterTable
ALTER TABLE "grn_line" DROP COLUMN "description",
DROP COLUMN "pr_line_id",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "location_id" INTEGER NOT NULL,
ADD COLUMN     "lot_balance_id" INTEGER NOT NULL,
ADD COLUMN     "lot_id" INTEGER NOT NULL,
ADD COLUMN     "po_line_id" INTEGER,
ADD COLUMN     "remarks" VARCHAR(255),
ADD COLUMN     "status" VARCHAR(20) NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "warehouse_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "grn_header" ADD CONSTRAINT "grn_header_po_approval_id_fkey" FOREIGN KEY ("po_approval_id") REFERENCES "po_approval"("approval_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grn_header" ADD CONSTRAINT "grn_header_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grn_header" ADD CONSTRAINT "grn_header_emp_dept_id_fkey" FOREIGN KEY ("emp_dept_id") REFERENCES "employee_department"("emp_dept_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grn_header" ADD CONSTRAINT "grn_header_received_by_id_fkey" FOREIGN KEY ("received_by_id") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grn_line" ADD CONSTRAINT "grn_line_grn_id_fkey" FOREIGN KEY ("grn_id") REFERENCES "grn_header"("grn_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grn_line" ADD CONSTRAINT "grn_line_po_line_id_fkey" FOREIGN KEY ("po_line_id") REFERENCES "po_line"("po_line_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grn_line" ADD CONSTRAINT "grn_line_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("item_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grn_line" ADD CONSTRAINT "grn_line_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "item_uom"("item_uom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grn_line" ADD CONSTRAINT "grn_line_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("warehouse_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grn_line" ADD CONSTRAINT "grn_line_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grn_line" ADD CONSTRAINT "grn_line_lot_id_fkey" FOREIGN KEY ("lot_id") REFERENCES "item_lot"("lot_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grn_line" ADD CONSTRAINT "grn_line_lot_balance_id_fkey" FOREIGN KEY ("lot_balance_id") REFERENCES "item_lot_balance"("lot_balance_id") ON DELETE RESTRICT ON UPDATE CASCADE;
