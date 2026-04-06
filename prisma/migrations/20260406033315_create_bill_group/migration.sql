-- CreateTable
CREATE TABLE "bill_group" (
    "bill_group_id" SERIAL NOT NULL,
    "bill_group_code" VARCHAR(30) NOT NULL,
    "bill_group_name" VARCHAR(200) NOT NULL,
    "bill_group_nameeng" VARCHAR(200),
    "remark" VARCHAR(500),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bill_group_pkey" PRIMARY KEY ("bill_group_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bill_group_bill_group_code_key" ON "bill_group"("bill_group_code");
