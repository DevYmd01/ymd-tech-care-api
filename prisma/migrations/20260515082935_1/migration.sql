-- AddForeignKey
ALTER TABLE "doc_link_ic" ADD CONSTRAINT "doc_link_ic_system_document_id_fkey" FOREIGN KEY ("system_document_id") REFERENCES "system_document"("system_document_id") ON DELETE RESTRICT ON UPDATE CASCADE;
