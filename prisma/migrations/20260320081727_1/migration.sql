-- DropForeignKey
ALTER TABLE "po_header" DROP CONSTRAINT "po_header_pr_id_fkey";

-- AlterTable
ALTER TABLE "po_header" ALTER COLUMN "pr_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "qc_header" ADD COLUMN     "remarks" TEXT;

-- AddForeignKey
ALTER TABLE "po_header" ADD CONSTRAINT "po_header_pr_id_fkey" FOREIGN KEY ("pr_id") REFERENCES "pr_header"("pr_id") ON DELETE SET NULL ON UPDATE CASCADE;
