-- AddForeignKey
ALTER TABLE "pr_header" ADD CONSTRAINT "pr_header_warehouse_id_fkey" FOREIGN KEY ("warehouse_id") REFERENCES "warehouse"("warehouse_id") ON DELETE RESTRICT ON UPDATE CASCADE;
