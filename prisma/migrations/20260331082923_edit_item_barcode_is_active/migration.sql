-- AlterTable
ALTER TABLE "item" ADD COLUMN     "item_description" VARCHAR(255),
ADD COLUMN     "item_descriptioneng" VARCHAR(255),
ADD COLUMN     "item_nameeng" VARCHAR(255);

-- AlterTable
ALTER TABLE "item_barcode" ADD COLUMN     "is_active" BOOLEAN NOT NULL DEFAULT true;
