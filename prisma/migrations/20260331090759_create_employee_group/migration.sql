-- CreateTable
CREATE TABLE "employee_group" (
    "employee_group_id" SERIAL NOT NULL,
    "employee_group_code" VARCHAR(30) NOT NULL,
    "employee_group_name" VARCHAR(200) NOT NULL,
    "employee_group_nameeng" VARCHAR(200),
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "employee_group_pkey" PRIMARY KEY ("employee_group_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employee_group_employee_group_code_key" ON "employee_group"("employee_group_code");
