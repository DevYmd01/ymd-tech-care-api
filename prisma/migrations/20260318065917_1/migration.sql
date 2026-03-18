-- AlterTable
ALTER TABLE "pr_line" ADD COLUMN     "location_id" INTEGER;

-- AddForeignKey
ALTER TABLE "pr_line" ADD CONSTRAINT "pr_line_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "location"("location_id") ON DELETE SET NULL ON UPDATE CASCADE;
