-- CreateTable
CREATE TABLE "employee_signature" (
    "emp_signature_id" SERIAL NOT NULL,
    "emp_id" INTEGER NOT NULL,
    "signature_url" VARCHAR(500) NOT NULL,
    "signature_name" VARCHAR(255),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employee_signature_pkey" PRIMARY KEY ("emp_signature_id")
);

-- CreateIndex
CREATE INDEX "employee_signature_emp_id_idx" ON "employee_signature"("emp_id");

-- AddForeignKey
ALTER TABLE "employee_signature" ADD CONSTRAINT "employee_signature_emp_id_fkey" FOREIGN KEY ("emp_id") REFERENCES "employees"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;
