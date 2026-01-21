/*
  Warnings:

  - A unique constraint covering the columns `[branch_code]` on the table `org_branch` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[warehouse_code]` on the table `warehouse` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "org_branch_branch_code_key" ON "org_branch"("branch_code");

-- CreateIndex
CREATE UNIQUE INDEX "warehouse_warehouse_code_key" ON "warehouse"("warehouse_code");
