-- DropForeignKey
ALTER TABLE "qc_header" DROP CONSTRAINT "qc_header_department_id_fkey";

-- AlterTable
ALTER TABLE "qc_header" ALTER COLUMN "department_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "qc_header" ADD CONSTRAINT "qc_header_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "org_department"("department_id") ON DELETE SET NULL ON UPDATE CASCADE;
