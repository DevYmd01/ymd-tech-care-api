import { Injectable } from "@nestjs/common";
import { CreatePOHeaderDTO } from "../dto/create-po-header.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreatePOHeaderMapper {
    toPrisma(
        tx: Prisma.TransactionClient,
        data: CreatePOHeaderDTO,
        po_no: string,
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
    ): Prisma.po_headerCreateInput {
        return {
            po_no: po_no,
            pr: { connect: { pr_id: data.pr_id } },
            vendor: { connect: { vendor_id: data.vendor_id } },
            branch: { connect: { branch_id: data.branch_id } },
            warehouse: { connect: { warehouse_id: data.warehouse_id } },
            status: 'DRAFT',
            base_currency_code: data.base_currency_code,
            quote_currency_code: data.quote_currency_code,
            exchange_rate: data.exchange_rate,
            exchange_rate_date: data.exchange_rate_date,
            base_total_amount: headerDocTotals.baseGrandTotal ?? headerDocTotals.grandTotal,
            quote_total_amount: headerDocTotals.grandTotal,
            tax_code: { connect: { tax_code_id: data.tax_code_id } },
            tax_rate: headerDocTotals.taxRate?.toNumber() ?? 0,
            base_tax_amount: headerDocTotals.baseTaxAmount?.toNumber() ?? 0,
            quote_tax_amount: headerDocTotals.taxAmount.toNumber(),
            discount_expression: data.discount_expression,
            base_discount_amount: headerDocTotals.baseDiscountAmount?.toNumber() ?? 0,
            quote_discount_amount: headerDocTotals.discountAmount.toNumber(),
            createdPoHeaders: { connect: { employee_id: data.created_by } }
        };
    }
}