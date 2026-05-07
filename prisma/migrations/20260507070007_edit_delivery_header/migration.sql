-- AlterTable
ALTER TABLE "delivery_header" ALTER COLUMN "ship_to_address" DROP NOT NULL,
ALTER COLUMN "ship_method" DROP NOT NULL,
ALTER COLUMN "carrier" DROP NOT NULL,
ALTER COLUMN "tracking_no" DROP NOT NULL;
