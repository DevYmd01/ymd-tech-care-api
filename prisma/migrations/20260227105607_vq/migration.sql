-- AlterTable
ALTER TABLE "vq_header" ADD COLUMN     "created_by" INTEGER,
ADD COLUMN     "updated_by" INTEGER;

-- AlterTable
ALTER TABLE "vq_line" ADD COLUMN     "discount_rate" DECIMAL(9,4);

-- AddForeignKey
ALTER TABLE "vq_header" ADD CONSTRAINT "vq_header_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "vq_header" ADD CONSTRAINT "vq_header_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;
