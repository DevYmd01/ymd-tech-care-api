import { Prisma } from "@prisma/client";
import { CreateHeaderDto } from "../dto/create-header.dto";

type HeaderDocTotals = {
  grandTotal: Prisma.Decimal;
  baseGrandTotal?: Prisma.Decimal | null;
  taxRate?: Prisma.Decimal | null;
  taxAmount?: Prisma.Decimal | null;
  baseTaxAmount?: Prisma.Decimal | null;
  discountAmount?: Prisma.Decimal | null;
  baseDiscountAmount?: Prisma.Decimal | null;
};

export class CreateHeaderMapper {
  static toPrismaCreateInput(
    data: CreateHeaderDto,
    documentNo: string,
    headerDocTotals: HeaderDocTotals
  ): Prisma.sale_quotation_approval_headerCreateInput {
    return {
      aq_no: documentNo,
      aq_date: data.aq_date,
sq_header: { connect: { sq_id: data.sq_id } },
      status: data.status ?? "PENDING",
      remarks: data.remarks,

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
              connect: { tax_code_id: data.tax_code_id },
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

      approval_emp: {
        connect: {
          employee_id: data.approval_emp_id,
        },
      },
      approval_emp_name: data.approval_emp_name,
    };
  }
}