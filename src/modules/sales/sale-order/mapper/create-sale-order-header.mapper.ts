import { Prisma } from "@prisma/client";
import { CreateSaleReservationHeaderDto } from "../dto/create-sale-order-header.dto";

export class CreateSaleOrderHeaderMapper {
  static toPrismaCreateInput(
    data: CreateSaleReservationHeaderDto,
    so_no: string,
    headerDocTotals: any,
  ): Prisma.sale_order_headerCreateInput {
    return {
      so_no: so_no,
      so_date: data.so_date || new Date(),

      customer: { connect: { customer_id: data.customer_id } },
      branch: { connect: { branch_id: data.branch_id } },
      reservation_header: { connect: { reservation_id: data.reservation_id } },

      status: data.status || "DRAFT",
      ship_days: data.ship_days,
      remarks: data.remarks || "",
      payment_term_days: data.payment_term_days,
      onhold: data.onhold || "N",
      status_remark: data.status_remark || "",
      ship_date: data.ship_date,
      base_currency_code: data.base_currency_code,
      quote_currency_code: data.quote_currency_code,
      exchange_rate: data.exchange_rate,
      exchange_rate_date: data.exchange_rate_date,

      base_total_amount: headerDocTotals.baseGrandTotal ?? headerDocTotals.grandTotal,
      quote_total_amount: headerDocTotals.grandTotal,

      tax_code: { connect: { tax_code_id: data.tax_code_id } },
      tax_rate: headerDocTotals.taxRate?.toNumber() ?? 0,
      base_tax_amount: headerDocTotals.baseTaxAmount?.toNumber() ?? 0,
      quote_tax_amount: headerDocTotals.taxAmount?.toNumber() ?? 0,

      discount_expression: data.discount_expression,
      base_discount_amount: headerDocTotals.baseDiscountAmount?.toNumber() ?? 0,
      quote_discount_amount: headerDocTotals.discountAmount?.toNumber() ?? 0,

      ...(data.emp_sale_id
        ? { emp_sale: { connect: { employee_id: data.emp_sale_id } } }
        : {}),

      sale_area: { connect: { sale_area_id: data.sale_area_id } },
      emp_dept: { connect: { emp_dept_id: data.emp_dept_id } },
      project: { connect: { project_id: data.project_id } },
    };
  }
}
