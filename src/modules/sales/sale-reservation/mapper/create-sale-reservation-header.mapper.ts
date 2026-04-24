import { Prisma } from "@prisma/client";
import { CreateSaleReservationHeaderDto } from "../dto/create-sale-reservation-header.dto";

export class CreateSaleReservationHeaderMapper {
  static toPrismaCreateInput(
    data: CreateSaleReservationHeaderDto,
    rs_no: string,
    headerDocTotals: any,
  ): Prisma.sale_reservation_headerCreateInput {
    return {
      reservation_no: rs_no,
      reservation_date: data.reservation_date || new Date(),

      customer: { connect: { customer_id: data.customer_id } },
      branch: { connect: { branch_id: data.branch_id } },
      aq_header: { connect: { aq_id: data.aq_id } },
      
      ...(data.sq_id
        ? { sq_header: { connect: { sq_id: data.sq_id } } }
        : {}),

      status: data.status || "DRAFT",
      ship_days: data.ship_days,
      remarks: data.remarks || "",
      payment_term_days: data.payment_term_days,
      onhold: data.onhold || "N",
      status_remark: data.status_remark || "",

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
