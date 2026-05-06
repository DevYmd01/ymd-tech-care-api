-- AlterTable
ALTER TABLE "employee_position" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "employees" ADD COLUMN     "employee_fullname_en" VARCHAR(400),
ALTER COLUMN "employee_fullname" DROP NOT NULL;
