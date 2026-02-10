/*
  Warnings:

  - You are about to drop the `exchange_rate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "exchange_rate";

-- CreateTable
CREATE TABLE "exchange_rate_snapshot" (
    "exchange_rate_snapshot_id" SERIAL NOT NULL,
    "base_currency" VARCHAR(3) NOT NULL,
    "quote_currency" VARCHAR(3) NOT NULL,
    "rate" DECIMAL(18,6) NOT NULL,
    "rate_date" TIMESTAMP(3) NOT NULL,
    "source" VARCHAR(50),
    "pr_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "exchange_rate_snapshot_pkey" PRIMARY KEY ("exchange_rate_snapshot_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exchange_rate_snapshot_pr_id_key" ON "exchange_rate_snapshot"("pr_id");

-- CreateIndex
CREATE INDEX "exchange_rate_snapshot_base_currency_quote_currency_rate_da_idx" ON "exchange_rate_snapshot"("base_currency", "quote_currency", "rate_date");

-- AddForeignKey
ALTER TABLE "exchange_rate_snapshot" ADD CONSTRAINT "exchange_rate_snapshot_pr_id_fkey" FOREIGN KEY ("pr_id") REFERENCES "pr_header"("pr_id") ON DELETE RESTRICT ON UPDATE CASCADE;
