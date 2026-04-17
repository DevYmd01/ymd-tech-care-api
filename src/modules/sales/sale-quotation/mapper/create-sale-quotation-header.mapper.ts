import { Prisma } from "@prisma/client";
import { CreateSaleQuotationHeaderDto } from "../dto/create-sale-quotation-header.dto";
import { connect } from "http2";

export class CreateSaleQuotationHeaderMapper {
  static toPrismaCreateInput(
    data: CreateSaleQuotationHeaderDto,
    sq_no: string,
    headerDocTotals: any,
  ): Prisma.sale_quotation_headerCreateInput {
    return {
      sq_no,
      sq_date: data.sq_date,
      lead_id: data.lead_id,
      customer: {
        connect: { customer_id: data.customer_id },
      },

      branch: {
        connect: { branch_id: data.branch_id },
      },

      status: data.status || "DRAFT",
      valid_until: data.valid_until,
      remarks: data.remarks,
      payment_term_days: data.payment_term_days,
      onhold: data.onhold,

      base_currency_code: data.base_currency_code,
      quote_currency_code: data.quote_currency_code,
      exchange_rate: data.exchange_rate,
      exchange_rate_date: data.exchange_rate_date,

      base_total_amount:
        headerDocTotals.baseGrandTotal ?? headerDocTotals.grandTotal,

      quote_total_amount: headerDocTotals.grandTotal,

...(data.tax_code_id
  ? {
      tax_code: {
        connect: {
          tax_code_id: data.tax_code_id,
        },
      },
    }
  : {}),

      tax_rate: headerDocTotals.taxRate?.toNumber() ?? 0,
      base_tax_amount: headerDocTotals.baseTaxAmount?.toNumber() ?? 0,
      quote_tax_amount: headerDocTotals.taxAmount?.toNumber() ?? 0,

      discount_expression: data.discount_expression,
      base_discount_amount:
        headerDocTotals.baseDiscountAmount?.toNumber() ?? 0,
      quote_discount_amount:
        headerDocTotals.discountAmount?.toNumber() ?? 0,

      emp_area: {
        connect: { employee_id: data.emp_area_id },
      },

      emp_dept: {
        connect: { emp_dept_id: data.emp_dept_id },
      },

      project: { 
        connect: { project_id: data.project_id}
      },

      sq_status: data.sq_status || "DRAFT",
    };
  }
}