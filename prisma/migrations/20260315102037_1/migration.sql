-- AlterTable
ALTER TABLE "vendor_type" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true,
ALTER COLUMN "status" DROP NOT NULL;
