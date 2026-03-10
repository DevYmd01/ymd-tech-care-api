/*
  Warnings:

  - Added the required column `budget_amount` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cost_center_id` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `end_date` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_date` to the `project` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "project" ADD COLUMN     "budget_amount" DECIMAL(15,2) NOT NULL,
ADD COLUMN     "cost_center_id" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "end_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" VARCHAR(20) NOT NULL;

-- AddForeignKey
ALTER TABLE "project" ADD CONSTRAINT "project_cost_center_id_fkey" FOREIGN KEY ("cost_center_id") REFERENCES "cost_center"("cost_center_id") ON DELETE RESTRICT ON UPDATE CASCADE;
