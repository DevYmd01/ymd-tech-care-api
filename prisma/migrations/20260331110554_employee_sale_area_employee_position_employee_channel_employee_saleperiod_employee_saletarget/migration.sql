-- CreateTable
CREATE TABLE "employee_position" (
    "position_id" SERIAL NOT NULL,
    "position_code" VARCHAR(30) NOT NULL,
    "position_name" VARCHAR(200) NOT NULL,
    "position_nameeng" VARCHAR(200),
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "employee_position_pkey" PRIMARY KEY ("position_id")
);

-- CreateTable
CREATE TABLE "employee_channel" (
    "channel_id" SERIAL NOT NULL,
    "channel_code" VARCHAR(30) NOT NULL,
    "channel_name" VARCHAR(200) NOT NULL,
    "channel_nameeng" VARCHAR(200),
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "employee_channel_pkey" PRIMARY KEY ("channel_id")
);

-- CreateTable
CREATE TABLE "employee_saleperiod" (
    "saleperiod_id" SERIAL NOT NULL,
    "saleperiod_code" VARCHAR(30) NOT NULL,
    "saleperiod_name" VARCHAR(200) NOT NULL,
    "saleperiod_nameeng" VARCHAR(200),
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "employee_saleperiod_pkey" PRIMARY KEY ("saleperiod_id")
);

-- CreateTable
CREATE TABLE "employee_saletarget" (
    "saletarget_id" SERIAL NOT NULL,
    "saletarget_code" VARCHAR(30) NOT NULL,
    "saletarget_name" VARCHAR(200) NOT NULL,
    "saletarget_nameeng" VARCHAR(200),
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "employee_saletarget_pkey" PRIMARY KEY ("saletarget_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employee_position_position_code_key" ON "employee_position"("position_code");

-- CreateIndex
CREATE UNIQUE INDEX "employee_channel_channel_code_key" ON "employee_channel"("channel_code");

-- CreateIndex
CREATE UNIQUE INDEX "employee_saleperiod_saleperiod_code_key" ON "employee_saleperiod"("saleperiod_code");

-- CreateIndex
CREATE UNIQUE INDEX "employee_saletarget_saletarget_code_key" ON "employee_saletarget"("saletarget_code");
