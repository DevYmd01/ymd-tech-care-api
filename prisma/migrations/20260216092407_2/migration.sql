-- AlterTable
ALTER TABLE "project" ALTER COLUMN "budget_amount" DROP NOT NULL,
ALTER COLUMN "description" DROP NOT NULL,
ALTER COLUMN "end_date" DROP NOT NULL,
ALTER COLUMN "start_date" DROP NOT NULL;
