-- DropForeignKey
ALTER TABLE "pr_header" DROP CONSTRAINT "pr_header_warehouse_id_fkey";

-- AlterTable
ALTER TABLE "pr_header" ALTER COLUMN "need_by_date" DROP NOT NULL,
ALTER COLUMN "warehouse_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "pr_header" ADD CONSTRAINT "pr_header_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("warehouse_id") ON DELETE SET NULL ON UPDATE CASCADE;
