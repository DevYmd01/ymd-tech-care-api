import { createPoApprovalDto } from '../dto/create-po-approval.dto';
import { Prisma } from '@prisma/client';

export class PoApprovalHeaderMapper {
    static toPrismaCreateInput(
        dto: createPoApprovalDto,
        approval_no: string,
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
    ): Prisma.po_approvalCreateInput {
        return {

            approval_no: approval_no,
            approval_date: dto.approval_date,
            need_by_date: dto.need_by_date,
            status: dto.status,
            remarks: dto.remarks,

            approval_emp: { connect: { employee_id: dto.approval_emp_id } },
            approval_emp_name: dto.approval_emp_name,
            poHeader: { connect: { po_header_id: dto.po_header_id } },

            base_currency_code: dto.base_currency_code,
            quote_currency_code: dto.quote_currency_code,
            exchange_rate: dto.exchange_rate,
            exchange_rate_date: dto.exchange_rate_date,
            base_total_amount: headerDocTotals.baseGrandTotal ?? headerDocTotals.grandTotal,
            quote_total_amount: headerDocTotals.grandTotal,
            tax_code: { connect: { tax_code_id: dto.tax_code_id } },
            tax_rate: headerDocTotals.taxRate?.toNumber() ?? 0,
            base_tax_amount: headerDocTotals.baseTaxAmount?.toNumber() ?? 0,
            quote_tax_amount: headerDocTotals.taxAmount.toNumber(),
            discount_expression: dto.discount_expression,
            base_discount_amount: headerDocTotals.baseDiscountAmount?.toNumber() ?? 0,
            quote_discount_amount: headerDocTotals.discountAmount.toNumber(),
        }
    }
}