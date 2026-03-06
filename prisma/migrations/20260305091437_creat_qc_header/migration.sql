-- AlterTable
ALTER TABLE "vq_header" ADD COLUMN     "is_awarded" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "qc_header" (
    "qc_id" SERIAL NOT NULL,
    "qc_no" VARCHAR(30) NOT NULL,
    "pr_id" INTEGER NOT NULL,
    "rfq_id" INTEGER NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "created_by" INTEGER,
    "updated_by" INTEGER,

    CONSTRAINT "qc_header_pkey" PRIMARY KEY ("qc_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "qc_header_qc_no_key" ON "qc_header"("qc_no");

-- AddForeignKey
ALTER TABLE "qc_header" ADD CONSTRAINT "qc_header_pr_id_fkey" FOREIGN KEY ("pr_id") REFERENCES "pr_header"("pr_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_header" ADD CONSTRAINT "qc_header_rfq_id_fkey" FOREIGN KEY ("rfq_id") REFERENCES "rfq_header"("rfq_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_header" ADD CONSTRAINT "qc_header_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qc_header" ADD CONSTRAINT "qc_header_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "employees"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;
