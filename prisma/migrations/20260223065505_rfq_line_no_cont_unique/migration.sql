-- DropIndex
DROP INDEX "rfq_line_line_no_key";

-- AlterTable
ALTER TABLE "rfq_vendor" ADD COLUMN     "invited_at" TIMESTAMP(3),
ADD COLUMN     "is_active" BOOLEAN DEFAULT false,
ALTER COLUMN "status" DROP NOT NULL;
