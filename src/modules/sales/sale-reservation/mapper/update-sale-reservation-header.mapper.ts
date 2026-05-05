import { Prisma } from "@prisma/client";
import { UpdateSaleReservationHeaderDto } from "../dto/update-sale-reservation-header.dto";

export class UpdateSaleReservationHeaderMapper {
    static toPrismaUpdateInput(
        data: UpdateSaleReservationHeaderDto,
        headerDocTotals: {
            subtotal: Prisma.Decimal;
            netAmount: Prisma.Decimal;
            taxRate?: Prisma.Decimal | null;
            baseTaxAmount?: Prisma.Decimal | null;
            taxAmount?: Prisma.Decimal | null;
            baseDiscountAmount?: Prisma.Decimal | null;
            discountAmount?: Prisma.Decimal | null;
            baseGrandTotal?: Prisma.Decimal | null;
            grandTotal?: Prisma.Decimal | null;
        },
    ): Prisma.sale_reservation_headerUpdateInput {
        return {
            ...(data.reservation_date !== undefined && {
                reservation_date: data.reservation_date
            }),

            customer: { connect: { customer_id: data.customer_id } },
            branch: { connect: { branch_id: data.branch_id } },
            aq_header: { connect: { aq_id: data.aq_id } },

            ...(data.sq_id
                ? { sq_header: { connect: { sq_id: data.sq_id } } }
                : {}),

            status: data.status,
            ship_days: data.ship_days,

            payment_term_days: data.payment_term_days,

            ...(data.remarks !== undefined && {
                remarks: data.remarks
            }),
            ...(data.onhold !== undefined && {
                onhold: data.onhold
            }),

            base_currency_code: data.base_currency_code,
            quote_currency_code: data.quote_currency_code,
            exchange_rate: data.exchange_rate,
            exchange_rate_date: data.exchange_rate_date,

            base_total_amount: headerDocTotals.baseGrandTotal ?? headerDocTotals.grandTotal ?? new Prisma.Decimal(0),
            quote_total_amount: headerDocTotals.grandTotal ?? new Prisma.Decimal(0),

            ...(data.tax_code_id && {
                tax_code: { connect: { tax_code_id: data.tax_code_id } }
            }),

            tax_rate: headerDocTotals.taxRate ?? new Prisma.Decimal(0),
            base_tax_amount: headerDocTotals.baseTaxAmount ?? new Prisma.Decimal(0),
            quote_tax_amount: headerDocTotals.taxAmount ?? new Prisma.Decimal(0),

            discount_expression: data.discount_expression,
            base_discount_amount: headerDocTotals.baseDiscountAmount ?? new Prisma.Decimal(0),
            quote_discount_amount: headerDocTotals.discountAmount ?? new Prisma.Decimal(0),

            ...(data.emp_sale_id
                ? { emp_sale: { connect: { employee_id: data.emp_sale_id } } }
                : {}),

            sale_area: { connect: { sale_area_id: data.sale_area_id } },
            emp_dept: { connect: { emp_dept_id: data.emp_dept_id } },
            project: { connect: { project_id: data.project_id } },
        };
    }
}