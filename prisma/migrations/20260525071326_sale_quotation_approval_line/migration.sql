-- DropForeignKey
ALTER TABLE "sale_quotation_approval_line" DROP CONSTRAINT "sale_quotation_approval_line_uom_id_fkey";

-- AddForeignKey
ALTER TABLE "sale_quotation_approval_line" ADD CONSTRAINT "sale_quotation_approval_line_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "item_uom"("item_uom_id") ON DELETE RESTRICT ON UPDATE CASCADE;
