-- CreateTable
CREATE TABLE "document_format" (
    "document_format_id" SERIAL NOT NULL,
    "module_code" TEXT NOT NULL,
    "document_type_code" TEXT NOT NULL,
    "prefix" TEXT,
    "use_year" BOOLEAN NOT NULL,
    "use_month" BOOLEAN NOT NULL,
    "use_day" BOOLEAN NOT NULL,
    "seq_length" INTEGER NOT NULL,
    "running_cycle" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "document_format_pkey" PRIMARY KEY ("document_format_id")
);

-- CreateTable
CREATE TABLE "document_running" (
    "id" SERIAL NOT NULL,
    "document_format_id" INTEGER NOT NULL,
    "branch_id" INTEGER,
    "prefix" TEXT,
    "year" INTEGER,
    "month" INTEGER,
    "day" INTEGER,
    "last_seq" INTEGER NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "document_running_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "document_running_document_format_id_branch_id_prefix_year_m_key" ON "document_running"("document_format_id", "branch_id", "prefix", "year", "month", "day");

-- AddForeignKey
ALTER TABLE "document_running" ADD CONSTRAINT "document_running_document_format_id_fkey" FOREIGN KEY ("document_format_id") REFERENCES "document_format"("document_format_id") ON DELETE RESTRICT ON UPDATE CASCADE;
