-- CreateTable
CREATE TABLE "audit_log" (
    "audit_log_id" BIGSERIAL NOT NULL,
    "module_code" VARCHAR(20) NOT NULL,
    "document_type" VARCHAR(30) NOT NULL,
    "document_id" BIGINT NOT NULL,
    "document_no" VARCHAR(50),
    "table_name" VARCHAR(50) NOT NULL,
    "record_id" BIGINT NOT NULL,
    "field_name" VARCHAR(100),
    "old_value" TEXT,
    "new_value" TEXT,
    "action_type" VARCHAR(20) NOT NULL,
    "reason" VARCHAR(255),
    "changed_by" BIGINT NOT NULL,
    "changed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "request_id" UUID NOT NULL,
    "job_id" VARCHAR(100),

    CONSTRAINT "audit_log_pkey" PRIMARY KEY ("audit_log_id")
);

-- CreateIndex
CREATE INDEX "audit_log_module_code_document_type_document_id_idx" ON "audit_log"("module_code", "document_type", "document_id");

-- CreateIndex
CREATE INDEX "audit_log_document_no_idx" ON "audit_log"("document_no");

-- CreateIndex
CREATE INDEX "audit_log_changed_at_idx" ON "audit_log"("changed_at");

-- CreateIndex
CREATE INDEX "audit_log_changed_by_idx" ON "audit_log"("changed_by");

-- CreateIndex
CREATE INDEX "audit_log_request_id_idx" ON "audit_log"("request_id");
