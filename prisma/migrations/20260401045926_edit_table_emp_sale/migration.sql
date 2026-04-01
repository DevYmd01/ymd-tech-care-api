/*
  Warnings:

  - You are about to drop the `employee_channel` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee_saleperiod` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `employee_saletarget` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "employee_channel";

-- DropTable
DROP TABLE "employee_saleperiod";

-- DropTable
DROP TABLE "employee_saletarget";

-- CreateTable
CREATE TABLE "employee_sale_channel" (
    "channel_id" SERIAL NOT NULL,
    "channel_code" VARCHAR(30) NOT NULL,
    "channel_name" VARCHAR(200) NOT NULL,
    "channel_nameeng" VARCHAR(200),
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "employee_sale_channel_pkey" PRIMARY KEY ("channel_id")
);

-- CreateTable
CREATE TABLE "employee_sale_period" (
    "saleperiod_id" SERIAL NOT NULL,
    "saleperiod_code" VARCHAR(30) NOT NULL,
    "saleperiod_name" VARCHAR(200) NOT NULL,
    "saleperiod_nameeng" VARCHAR(200),
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "employee_sale_period_pkey" PRIMARY KEY ("saleperiod_id")
);

-- CreateTable
CREATE TABLE "employee_sale_target" (
    "saletarget_id" SERIAL NOT NULL,
    "saletarget_code" VARCHAR(30) NOT NULL,
    "saletarget_name" VARCHAR(200) NOT NULL,
    "saletarget_nameeng" VARCHAR(200),
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "employee_sale_target_pkey" PRIMARY KEY ("saletarget_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employee_sale_channel_channel_code_key" ON "employee_sale_channel"("channel_code");

-- CreateIndex
CREATE UNIQUE INDEX "employee_sale_period_saleperiod_code_key" ON "employee_sale_period"("saleperiod_code");

-- CreateIndex
CREATE UNIQUE INDEX "employee_sale_target_saletarget_code_key" ON "employee_sale_target"("saletarget_code");
