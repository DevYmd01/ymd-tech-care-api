-- AlterTable
ALTER TABLE "pr_header" ADD COLUMN     "cancel_flag" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "onhold" BOOLEAN NOT NULL DEFAULT false;
