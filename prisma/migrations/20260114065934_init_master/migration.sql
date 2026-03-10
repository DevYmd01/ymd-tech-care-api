/*
  Warnings:

  - You are about to drop the `cost_center` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `item` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `org_branch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `project` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `vendor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `warehouse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "warehouse" DROP CONSTRAINT "warehouse_branch_id_fkey";

-- DropTable
DROP TABLE "cost_center";

-- DropTable
DROP TABLE "item";

-- DropTable
DROP TABLE "org_branch";

-- DropTable
DROP TABLE "project";

-- DropTable
DROP TABLE "vendor";

-- DropTable
DROP TABLE "warehouse";
