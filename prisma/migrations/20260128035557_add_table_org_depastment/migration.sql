-- CreateTable
CREATE TABLE "org_position" (
    "position_id" SERIAL NOT NULL,
    "position_code" VARCHAR(20) NOT NULL,
    "position_name" VARCHAR(200) NOT NULL,
    "position_name_en" VARCHAR(200) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "org_position_pkey" PRIMARY KEY ("position_id")
);

-- CreateTable
CREATE TABLE "org_department" (
    "department_id" SERIAL NOT NULL,
    "department_code" VARCHAR(20) NOT NULL,
    "department_name" VARCHAR(200) NOT NULL,
    "department_name_en" VARCHAR(200) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "org_department_pkey" PRIMARY KEY ("department_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "org_position_position_code_key" ON "org_position"("position_code");

-- CreateIndex
CREATE UNIQUE INDEX "org_department_department_code_key" ON "org_department"("department_code");
