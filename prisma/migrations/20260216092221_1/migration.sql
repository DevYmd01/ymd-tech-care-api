/*
  Warnings:

  - You are about to drop the column `cost_center_id` on the `project` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `project` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "project" DROP CONSTRAINT "project_cost_center_id_fkey";

-- AlterTable
ALTER TABLE "project" DROP COLUMN "cost_center_id",
DROP COLUMN "status",
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;
