-- CreateTable
CREATE TABLE "pr_line" (
    "pr_line_id" SERIAL NOT NULL,
    "line_no" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "description" TEXT,
    "pr_id" INTEGER NOT NULL,
    "qty" DECIMAL(18,3) NOT NULL,
    "uom_id" INTEGER NOT NULL,
    "est_unit_price" DECIMAL(18,4) NOT NULL,
    "tax_code" VARCHAR(20),
    "cost_center_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "required_receipt_type" VARCHAR(20),

    CONSTRAINT "pr_line_pkey" PRIMARY KEY ("pr_line_id")
);

-- CreateIndex
CREATE INDEX "pr_line_pr_id_idx" ON "pr_line"("pr_id");

-- CreateIndex
CREATE UNIQUE INDEX "pr_line_pr_id_line_no_key" ON "pr_line"("pr_id", "line_no");

-- AddForeignKey
ALTER TABLE "pr_line" ADD CONSTRAINT "pr_line_pr_id_fkey" FOREIGN KEY ("pr_id") REFERENCES "pr_header"("pr_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pr_line" ADD CONSTRAINT "pr_line_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item_type"("item_type_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pr_line" ADD CONSTRAINT "pr_line_uom_id_fkey" FOREIGN KEY ("uom_id") REFERENCES "uom"("uom_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pr_line" ADD CONSTRAINT "pr_line_cost_center_id_fkey" FOREIGN KEY ("cost_center_id") REFERENCES "cost_center"("cost_center_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pr_line" ADD CONSTRAINT "pr_line_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "project"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;
