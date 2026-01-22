/*
  Warnings:

  - Added the required column `updated_at` to the `org_branch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `warehouse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `warehouse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "org_branch" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "warehouse" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "uom" (
    "uom_id" SERIAL NOT NULL,
    "uom_code" VARCHAR(20) NOT NULL,
    "uom_name" VARCHAR(100) NOT NULL,
    "is_active" BOOLEAN,

    CONSTRAINT "uom_pkey" PRIMARY KEY ("uom_id")
);
