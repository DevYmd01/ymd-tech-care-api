-- CreateTable
CREATE TABLE "currency_type" (
    "currency_type_id" SERIAL NOT NULL,
    "currency_type_code" VARCHAR(30) NOT NULL,
    "currency_type_name" VARCHAR(200) NOT NULL,
    "currency_type_nameeng" VARCHAR(200) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "currency_type_pkey" PRIMARY KEY ("currency_type_id")
);
