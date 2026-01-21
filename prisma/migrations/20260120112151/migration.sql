/*
  Warnings:

  - The primary key for the `cost_center` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `cost_center_id` column on the `cost_center` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `item_id` column on the `item` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `org_branch` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `branch_id` column on the `org_branch` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `project_id` column on the `project` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `vendor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `vendor_id` column on the `vendor` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `warehouse` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `warehouse_id` column on the `warehouse` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `branch_id` on the `warehouse` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "warehouse" DROP CONSTRAINT "warehouse_branch_id_fkey";

-- AlterTable
ALTER TABLE "cost_center" DROP CONSTRAINT "cost_center_pkey",
DROP COLUMN "cost_center_id",
ADD COLUMN     "cost_center_id" SERIAL NOT NULL,
ADD CONSTRAINT "cost_center_pkey" PRIMARY KEY ("cost_center_id");

-- AlterTable
ALTER TABLE "item" DROP CONSTRAINT "item_pkey",
DROP COLUMN "item_id",
ADD COLUMN     "item_id" SERIAL NOT NULL,
ADD CONSTRAINT "item_pkey" PRIMARY KEY ("item_id");

-- AlterTable
ALTER TABLE "org_branch" DROP CONSTRAINT "org_branch_pkey",
DROP COLUMN "branch_id",
ADD COLUMN     "branch_id" SERIAL NOT NULL,
ADD CONSTRAINT "org_branch_pkey" PRIMARY KEY ("branch_id");

-- AlterTable
ALTER TABLE "project" DROP CONSTRAINT "project_pkey",
DROP COLUMN "project_id",
ADD COLUMN     "project_id" SERIAL NOT NULL,
ADD CONSTRAINT "project_pkey" PRIMARY KEY ("project_id");

-- AlterTable
ALTER TABLE "vendor" DROP CONSTRAINT "vendor_pkey",
DROP COLUMN "vendor_id",
ADD COLUMN     "vendor_id" SERIAL NOT NULL,
ADD CONSTRAINT "vendor_pkey" PRIMARY KEY ("vendor_id");

-- AlterTable
ALTER TABLE "warehouse" DROP CONSTRAINT "warehouse_pkey",
DROP COLUMN "warehouse_id",
ADD COLUMN     "warehouse_id" SERIAL NOT NULL,
DROP COLUMN "branch_id",
ADD COLUMN     "branch_id" INTEGER NOT NULL,
ADD CONSTRAINT "warehouse_pkey" PRIMARY KEY ("warehouse_id");

-- CreateTable
CREATE TABLE "pr_header" (
    "pr_id" SERIAL NOT NULL,
    "pr_no" VARCHAR(30) NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "request_date" TIMESTAMP(3) NOT NULL,
    "required_date" TIMESTAMP(3) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "total_amount" DECIMAL(18,2) NOT NULL,

    CONSTRAINT "pr_header_pkey" PRIMARY KEY ("pr_id")
);

-- AddForeignKey
ALTER TABLE "warehouse" ADD CONSTRAINT "warehouse_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pr_header" ADD CONSTRAINT "pr_header_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;
