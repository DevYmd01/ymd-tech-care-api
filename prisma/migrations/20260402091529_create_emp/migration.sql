-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "employee_head_code" VARCHAR(25),
ADD COLUMN     "employee_head_id" INTEGER,
ADD COLUMN     "tax_idcard" VARCHAR(20);

-- AlterTable
ALTER TABLE "item_barcode" ALTER COLUMN "barcode" SET DATA TYPE VARCHAR(80);

-- CreateTable
CREATE TABLE "employee_side" (
    "side_id" SERIAL NOT NULL,
    "side_code" VARCHAR(30) NOT NULL,
    "side_name" VARCHAR(200) NOT NULL,
    "side_nameeng" VARCHAR(200),
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "employee_side_pkey" PRIMARY KEY ("side_id")
);

-- CreateTable
CREATE TABLE "employee_department" (
    "employee_id" SERIAL NOT NULL,
    "department_id" INTEGER NOT NULL,
    "side_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_department_pkey" PRIMARY KEY ("employee_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "employee_side_side_code_key" ON "employee_side"("side_code");

-- CreateIndex
CREATE UNIQUE INDEX "employee_department_department_id_side_id_key" ON "employee_department"("department_id", "side_id");

-- AddForeignKey
ALTER TABLE "employee_department" ADD CONSTRAINT "employee_department_side_id_fkey" FOREIGN KEY ("side_id") REFERENCES "employee_side"("side_id") ON DELETE CASCADE ON UPDATE CASCADE;
