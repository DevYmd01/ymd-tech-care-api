-- CreateTable
CREATE TABLE "api_log" (
    "id" SERIAL NOT NULL,
    "employee_id" INTEGER,
    "method" VARCHAR(10) NOT NULL,
    "path" VARCHAR(255) NOT NULL,
    "status_code" INTEGER NOT NULL,
    "response_ms" INTEGER NOT NULL,
    "ip_address" VARCHAR(100),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "api_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "api_log_created_at_idx" ON "api_log"("created_at");
