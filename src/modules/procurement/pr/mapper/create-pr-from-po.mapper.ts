
import { CreatePOHeaderDTO } from "../../po/dto/create-po-header.dto";
import { Prisma } from "@prisma/client";

export class CreatePRFromPOHeaderMapper {
  static  toPrismaCreateInput(
        data: CreatePOHeaderDTO,
        pr_no: string,
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
    ): Prisma.pr_headerCreateInput {
        return {
            pr_no: pr_no,
            status: 'APPROVED',
            pr_date: new Date(),
            pr_base_currency_code: data.base_currency_code,
            pr_quote_currency_code: data.quote_currency_code,
            pr_exchange_rate: data.exchange_rate,
            pr_exchange_rate_date: data.exchange_rate_date,
            pr_base_total_amount: headerDocTotals.baseGrandTotal ?? headerDocTotals.grandTotal,
            pr_quote_total_amount: headerDocTotals.grandTotal,
            pr_tax_code: { connect: { tax_code_id: data.tax_code_id } },
            pr_tax_rate: headerDocTotals.taxRate?.toNumber() ?? 0,
            pr_tax_amount: headerDocTotals.baseTaxAmount?.toNumber() ?? 0,
            pr_discount_raw: data.discount_expression,
            pr_discount_rate: headerDocTotals.baseDiscountAmount?.toNumber() ?? 0,
            pr_discount_amount: headerDocTotals.discountAmount.toNumber(),
            requester_user: { connect: { employee_id: data.created_by } },
            ...((data as any).project_id ? { project: { connect: { project_id: (data as any).project_id } } } : {}),
            ...((data as any).cost_center_id ? { cost_center: { connect: { cost_center_id: (data as any).cost_center_id } } } : {}),
        };
    }
}