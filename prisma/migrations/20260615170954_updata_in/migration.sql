-- DropForeignKey
ALTER TABLE "transfer_in_line" DROP CONSTRAINT "transfer_in_line_transfer_in_id_fkey";

-- AddForeignKey
ALTER TABLE "transfer_in_line" ADD CONSTRAINT "transfer_in_line_transfer_in_id_fkey" FOREIGN KEY ("transfer_in_id") REFERENCES "transfer_in_header"("transfer_in_id") ON DELETE RESTRICT ON UPDATE CASCADE;
