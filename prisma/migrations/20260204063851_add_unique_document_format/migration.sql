/*
  Warnings:

  - A unique constraint covering the columns `[module_code,document_type_code]` on the table `document_format` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "document_format_module_code_document_type_code_key" ON "document_format"("module_code", "document_type_code");
