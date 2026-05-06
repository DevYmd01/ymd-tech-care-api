-- AlterTable
ALTER TABLE "employees" ALTER COLUMN "employee_startdate" DROP NOT NULL,
ALTER COLUMN "employee_startdate" SET DEFAULT CURRENT_TIMESTAMP;
