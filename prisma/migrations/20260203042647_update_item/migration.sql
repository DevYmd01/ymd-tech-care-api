-- CreateEnum
CREATE TYPE "TrackingLevel" AS ENUM ('NONE', 'OPTIONAL', 'REQUIRED');

-- CreateEnum
CREATE TYPE "IssuePolicy" AS ENUM ('FIFO', 'FEFO', 'MANUAL');

-- AlterTable
ALTER TABLE "item" ADD COLUMN     "default_issue_policy" "IssuePolicy" NOT NULL DEFAULT 'FEFO',
ADD COLUMN     "lot_tracking_level" "TrackingLevel" NOT NULL DEFAULT 'NONE',
ADD COLUMN     "serial_tracking_level" "TrackingLevel" NOT NULL DEFAULT 'NONE',
ADD COLUMN     "shelf_life_days" INTEGER;

-- CreateIndex
CREATE INDEX "item_lot_tracking_level_idx" ON "item"("lot_tracking_level");

-- CreateIndex
CREATE INDEX "item_serial_tracking_level_idx" ON "item"("serial_tracking_level");

-- CreateIndex
CREATE INDEX "item_default_issue_policy_idx" ON "item"("default_issue_policy");
