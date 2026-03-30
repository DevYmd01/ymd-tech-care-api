import { UpdatePOHeaderDTO } from "../dto/update-po-header.dto";
import { Prisma } from "@prisma/client";

export class UpdatePOHeaderMapper {
  static toPrismaUpdateInput(
    data: UpdatePOHeaderDTO,
    headerDocTotals: {
      subtotal: Prisma.Decimal;
      discountAmount: Prisma.Decimal;
      netAmount: Prisma.Decimal;
      taxRate: Prisma.Decimal | null;
      taxAmount: Prisma.Decimal;
      grandTotal: Prisma.Decimal;

      baseGrandTotal: Prisma.Decimal | null;
      baseSubtotal: Prisma.Decimal | null;
      baseDiscountAmount: Prisma.Decimal | null;
      baseNetAmount: Prisma.Decimal | null;
      baseTaxAmount: Prisma.Decimal | null;
    }
  ): Prisma.po_headerUpdateInput {

    return {

      ...(data.pr_id !== undefined && {
        pr: data.pr_id === null ? { disconnect: true } : { connect: { pr_id: data.pr_id } }
      }),

      ...(data.qc_id !== undefined && {
        qc: data.qc_id === null ? { disconnect: true } : { connect: { qc_id: data.qc_id } }
      }),

      vendor: { connect: { vendor_id: data.vendor_id } },
      branch: { connect: { branch_id: data.branch_id } },
      warehouse: { connect: { warehouse_id: data.warehouse_id } },
      po_date: data.po_date,

      status: data.status,

      base_currency_code: data.base_currency_code,
      quote_currency_code: data.quote_currency_code,
      exchange_rate: data.exchange_rate,
      exchange_rate_date: data.exchange_rate_date,

      base_total_amount:
        headerDocTotals.baseGrandTotal ?? headerDocTotals.grandTotal,
      quote_total_amount: headerDocTotals.grandTotal,

      tax_code: { connect: { tax_code_id: data.tax_code_id } },
      tax_rate: headerDocTotals.taxRate?.toNumber() ?? 0,
      base_tax_amount: headerDocTotals.baseTaxAmount?.toNumber() ?? 0,
      quote_tax_amount: headerDocTotals.taxAmount.toNumber(),

      discount_expression: data.discount_expression,
      base_discount_amount: headerDocTotals.baseDiscountAmount?.toNumber() ?? 0,
      quote_discount_amount: headerDocTotals.discountAmount.toNumber(),

      updatedPoHeaders: { connect: { employee_id: data.updated_by } }
    };
  }
}