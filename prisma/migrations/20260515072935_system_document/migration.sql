-- CreateTable
CREATE TABLE "doc_link_ic" (
    "doc_link_ic_id" SERIAL NOT NULL,
    "system_document_id" INTEGER NOT NULL,
    "docu_desc" VARCHAR(255),
    "remark" VARCHAR(255),
    "stock_effect_ic" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "doc_link_ic_pkey" PRIMARY KEY ("doc_link_ic_id")
);
