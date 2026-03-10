/*
  Warnings:

  - A unique constraint covering the columns `[cost_center_code]` on the table `cost_center` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[project_code]` on the table `project` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "cost_center_cost_center_code_key" ON "cost_center"("cost_center_code");

-- CreateIndex
CREATE UNIQUE INDEX "project_project_code_key" ON "project"("project_code");
