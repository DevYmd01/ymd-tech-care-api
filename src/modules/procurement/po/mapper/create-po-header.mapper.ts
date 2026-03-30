import { CreatePOHeaderDTO } from "../dto/create-po-header.dto";
import { Prisma } from "@prisma/client";

export class CreatePOHeaderMapper {

    static toPrismaCreateInput(
        data: CreatePOHeaderDTO,
        po_no: string,
        headerDocTotals: any,
        // prId: number   // ⭐ บังคับต้องมี
    ): Prisma.po_headerCreateInput {

        return {
    po_no: po_no,
    po_date: data.po_date,

    ...(data.pr_id != null && {
        pr: {
            connect: {
                pr_id: data.pr_id
            }
        }
    }),

    ...(data.qc_id != null && {
        qc: {
            connect: {
                qc_id: data.qc_id
            }
        }
    }),

    vendor: { connect: { vendor_id: data.vendor_id } },
    branch: { connect: { branch_id: data.branch_id } },
    // warehouse: { connect: { warehouse_id: data.warehouse_id } },

    status: 'DRAFT',

    base_currency_code: data.base_currency_code,
    quote_currency_code: data.quote_currency_code,
    exchange_rate: data.exchange_rate,
    exchange_rate_date: data.exchange_rate_date,

    base_total_amount:
        headerDocTotals.baseGrandTotal ?? headerDocTotals.grandTotal,

    quote_total_amount: headerDocTotals.grandTotal,

    tax_code: {
        connect: { tax_code_id: data.tax_code_id }
    },

    tax_rate: headerDocTotals.taxRate?.toNumber() ?? 0,
    base_tax_amount: headerDocTotals.baseTaxAmount?.toNumber() ?? 0,
    quote_tax_amount: headerDocTotals.taxAmount.toNumber(),

    discount_expression: data.discount_expression,
    base_discount_amount:
        headerDocTotals.baseDiscountAmount?.toNumber() ?? 0,
    quote_discount_amount: headerDocTotals.discountAmount.toNumber(),

    createdPoHeaders: {
        connect: { employee_id: data.created_by }
    }
};

    }

}