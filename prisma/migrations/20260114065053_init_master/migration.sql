-- CreateTable
CREATE TABLE "org_branch" (
    "branch_id" TEXT NOT NULL,
    "branch_code" VARCHAR(20) NOT NULL,
    "branch_name" VARCHAR(200) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "org_branch_pkey" PRIMARY KEY ("branch_id")
);

-- CreateTable
CREATE TABLE "warehouse" (
    "warehouse_id" TEXT NOT NULL,
    "branch_id" TEXT NOT NULL,
    "warehouse_code" VARCHAR(20) NOT NULL,
    "warehouse_name" VARCHAR(200) NOT NULL,

    CONSTRAINT "warehouse_pkey" PRIMARY KEY ("warehouse_id")
);

-- CreateTable
CREATE TABLE "vendor" (
    "vendor_id" TEXT NOT NULL,
    "vendor_code" VARCHAR(30) NOT NULL,
    "vendor_name" VARCHAR(255) NOT NULL,
    "tax_id" VARCHAR(20),
    "payment_term_days" INTEGER NOT NULL,
    "status" VARCHAR(20) NOT NULL,

    CONSTRAINT "vendor_pkey" PRIMARY KEY ("vendor_id")
);

-- CreateTable
CREATE TABLE "item" (
    "item_id" TEXT NOT NULL,
    "item_code" VARCHAR(50) NOT NULL,
    "item_name" VARCHAR(255) NOT NULL,
    "item_type" VARCHAR(20) NOT NULL,
    "uom" VARCHAR(20) NOT NULL,

    CONSTRAINT "item_pkey" PRIMARY KEY ("item_id")
);

-- CreateTable
CREATE TABLE "cost_center" (
    "cost_center_id" TEXT NOT NULL,
    "cost_center_code" VARCHAR(30) NOT NULL,
    "cost_center_name" VARCHAR(200) NOT NULL,

    CONSTRAINT "cost_center_pkey" PRIMARY KEY ("cost_center_id")
);

-- CreateTable
CREATE TABLE "project" (
    "project_id" TEXT NOT NULL,
    "project_code" VARCHAR(30) NOT NULL,
    "project_name" VARCHAR(200) NOT NULL,

    CONSTRAINT "project_pkey" PRIMARY KEY ("project_id")
);

-- AddForeignKey
ALTER TABLE "warehouse" ADD CONSTRAINT "warehouse_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;
