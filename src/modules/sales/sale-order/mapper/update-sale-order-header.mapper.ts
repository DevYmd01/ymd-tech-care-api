import { Prisma } from "@prisma/client";
import { UpdateSaleOrderHeaderDto } from "../dto/update-sale-order-header.dto";

export class UpdateSaleOrderHeaderMapper {
    static toPrismaUpdateInput(
        data: UpdateSaleOrderHeaderDto,
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
    ): Prisma.sale_order_headerUpdateInput {
        return {
            // ❗ ไม่ควร overwrite ถ้าไม่ได้ส่งมา
            ...(data.so_date && { so_date: data.so_date }),
            ...(data.ship_date && { ship_date: data.ship_date }),
            ...(data.exchange_rate_date && { exchange_rate_date: data.exchange_rate_date }),

            // ❗ connect เฉพาะมีค่า
            ...(data.customer_id && {
                customer: { connect: { customer_id: data.customer_id } },
            }),
            ...(data.branch_id && {
                branch: { connect: { branch_id: data.branch_id } },
            }),
            ...(data.reservation_id && {
                reservation_header: { connect: { reservation_id: data.reservation_id } },
            }),
            ...(data.tax_code_id && {
                tax_code: { connect: { tax_code_id: data.tax_code_id } },
            }),
            ...(data.emp_sale_id && {
                emp_sale: { connect: { employee_id: data.emp_sale_id } },
            }),
            ...(data.sale_area_id && {
                sale_area: { connect: { sale_area_id: data.sale_area_id } },
            }),
            ...(data.emp_dept_id && {
                emp_dept: { connect: { emp_dept_id: data.emp_dept_id } },
            }),
            ...(data.project_id && {
                project: { connect: { project_id: data.project_id } },
            }),

            // ❗ field ธรรมดา (ไม่ overwrite ถ้า undefined)
            ...(data.status && { status: data.status }),
            ...(data.ship_days !== undefined && { ship_days: data.ship_days }),
            ...(data.payment_term_days !== undefined && {
                payment_term_days: data.payment_term_days,
            }),
            ...(data.onhold && { onhold: data.onhold }),
            ...(data.base_currency_code && {
                base_currency_code: data.base_currency_code,
            }),
            ...(data.quote_currency_code && {
                quote_currency_code: data.quote_currency_code,
            }),
            ...(data.exchange_rate !== undefined && {
                exchange_rate: data.exchange_rate,
            }),
            ...(data.discount_expression !== undefined && {
                discount_expression: data.discount_expression,
            }),

            // ❗ string ต้อง allow "" ได้
            ...(data.remarks !== undefined && { remarks: data.remarks }),
            ...(data.status_remark !== undefined && {
                status_remark: data.status_remark,
            }),

            // ✅ totals (กัน null + ไม่ใช้ toNumber)
            base_total_amount: headerDocTotals.baseGrandTotal ?? headerDocTotals.grandTotal ?? new Prisma.Decimal(0),
            quote_total_amount: headerDocTotals.grandTotal ?? new Prisma.Decimal(0),

            // ✅ tax (Decimal safe)
            tax_rate: headerDocTotals.taxRate ?? new Prisma.Decimal(0),
            base_tax_amount: headerDocTotals.baseTaxAmount ?? new Prisma.Decimal(0),
            quote_tax_amount: headerDocTotals.taxAmount ?? new Prisma.Decimal(0),

            // ✅ discount (Decimal safe)
            base_discount_amount: headerDocTotals.baseDiscountAmount ?? new Prisma.Decimal(0),
            quote_discount_amount: headerDocTotals.discountAmount ?? new Prisma.Decimal(0),
        };
    }
}