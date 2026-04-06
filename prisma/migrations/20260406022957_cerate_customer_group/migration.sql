-- CreateTable
CREATE TABLE "customer_group" (
    "customer_group_id" SERIAL NOT NULL,
    "customer_group_code" VARCHAR(30) NOT NULL,
    "customer_group_name" VARCHAR(200) NOT NULL,
    "customer_group_nameeng" VARCHAR(200),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "customer_group_pkey" PRIMARY KEY ("customer_group_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customer_group_customer_group_code_key" ON "customer_group"("customer_group_code");
