-- CreateTable
CREATE TABLE "ic_option" (
    "ic_option_id" SERIAL NOT NULL,
    "branch_id" INTEGER NOT NULL,
    "aging_expire" VARCHAR(50) NOT NULL,
    "auto_perpetual_cost" CHAR(1) NOT NULL,
    "barcode_flag" CHAR(1) NOT NULL,
    "check_deficit" CHAR(1) NOT NULL,
    "check_deficit_option" CHAR(1) NOT NULL,
    "check_max_qty" CHAR(1) NOT NULL,
    "check_min_qty" CHAR(1) NOT NULL,
    "check_qty_flag" CHAR(1) NOT NULL,
    "check_standcost" CHAR(1) NOT NULL,
    "expire_alert_flag" CHAR(1) NOT NULL,
    "order_alert_flag" CHAR(1) NOT NULL,
    "post_cost_flag" CHAR(1) NOT NULL,
    "reorder_flag" CHAR(1) NOT NULL,
    "set_autopost" CHAR(1) NOT NULL,
    "set_costcn" CHAR(1) NOT NULL,
    "set_costcn_ap" CHAR(1) NOT NULL,
    "set_costcn_ap_refinv" CHAR(1) NOT NULL,
    "set_costcn_refinv" CHAR(1) NOT NULL,
    "set_cost_return_issueref" CHAR(1) NOT NULL,
    "set_goodqty" CHAR(1) NOT NULL,
    "set_inve" CHAR(1) NOT NULL,
    "set_price" CHAR(1) NOT NULL,
    "set_price1" INTEGER NOT NULL,
    "set_price2" INTEGER NOT NULL,
    "set_price3" INTEGER NOT NULL,
    "set_price4" INTEGER NOT NULL,
    "set_price_ic" CHAR(1) NOT NULL,
    "set_price_pack" CHAR(1) NOT NULL,
    "set_price_po" CHAR(1) NOT NULL,
    "trasfer_cost_flag" CHAR(1) NOT NULL,

    CONSTRAINT "ic_option_pkey" PRIMARY KEY ("ic_option_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ic_option_branch_id_key" ON "ic_option"("branch_id");

-- AddForeignKey
ALTER TABLE "ic_option" ADD CONSTRAINT "ic_option_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "org_branch"("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE;
