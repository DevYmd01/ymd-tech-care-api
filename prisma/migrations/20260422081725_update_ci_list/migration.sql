/*
  Warnings:

  - You are about to drop the column `document_code` on the `ic_option_list` table. All the data in the column will be lost.
  - You are about to drop the column `document_name` on the `ic_option_list` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ic_option_id,system_document_id]` on the table `ic_option_list` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "ic_option_list_document_code_key";

-- AlterTable
ALTER TABLE "ic_option_list" DROP COLUMN "document_code",
DROP COLUMN "document_name";

-- CreateIndex
CREATE UNIQUE INDEX "ic_option_list_ic_option_id_system_document_id_key" ON "ic_option_list"("ic_option_id", "system_document_id");
