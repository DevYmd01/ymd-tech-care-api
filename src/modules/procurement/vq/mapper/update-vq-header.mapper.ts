import { UpdateVQHeaderDTO } from '../dto/update-vq-header.dto';
import { Prisma } from '@prisma/client';

export class UpdateVQHeaderMapper {
    static toPrismaUpdateInput(
        dto: UpdateVQHeaderDTO,
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
    ): Prisma.vq_headerUpdateInput {
        return {
            quotation_no: dto.quotation_no,
            pr: { connect: { pr_id: dto.pr_id } },
            pr_approval: { connect: { approval_id: dto.pr_approval_id } },
            rfq: { connect: { rfq_id: dto.rfq_id } },
            rfq_vendor: { connect: { rfq_vendor_id: dto.rfq_vendor_id } },
            vendor: { connect: { vendor_id: dto.vendor_id } },
            contact_name: dto.contact_name,
            contact_email: dto.contact_email,
            contact_phone: dto.contact_phone,
            quotation_date: dto.quotation_date,
            quotation_expiry_date: dto.quotation_expiry_date,
            lead_time_days: dto.lead_time_days,
            status: 'RECORDED',
            payment_term_days: dto.payment_term_days,
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
            createdVqHeaders: { connect: { employee_id: dto.created_by } }
        }
    }
}