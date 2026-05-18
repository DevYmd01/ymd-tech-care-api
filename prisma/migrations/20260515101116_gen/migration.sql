/*
  Warnings:

  - A unique constraint covering the columns `[system_document_id,doc_type_no,is_active]` on the table `doc_link_ic` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "doc_link_ic" ADD COLUMN     "doc_type_name" VARCHAR(255),
ADD COLUMN     "doc_type_no" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "doc_link_ic_system_document_id_doc_type_no_is_active_key" ON "doc_link_ic"("system_document_id", "doc_type_no", "is_active");
