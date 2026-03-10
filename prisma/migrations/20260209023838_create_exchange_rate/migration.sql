-- CreateTable
CREATE TABLE "exchange_rate" (
    "exchange_id" SERIAL NOT NULL,
    "currency_id" INTEGER NOT NULL,
    "currency_type_id" INTEGER NOT NULL,
    "rate_date" TIMESTAMP(3) NOT NULL,
    "exchange_round" INTEGER NOT NULL,
    "buy_rate" DECIMAL(65,30) NOT NULL,
    "sale_rate" DECIMAL(65,30) NOT NULL,
    "allow_adjust" DECIMAL(65,30) NOT NULL,
    "remark" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "exchange_rate_pkey" PRIMARY KEY ("exchange_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exchange_rate_currency_id_currency_type_id_rate_date_exchan_key" ON "exchange_rate"("currency_id", "currency_type_id", "rate_date", "exchange_round");
