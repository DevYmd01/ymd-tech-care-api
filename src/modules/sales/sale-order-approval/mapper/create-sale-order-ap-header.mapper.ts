import { Prisma } from '@prisma/client';
import { CreateSaleOrderApprovalHeaderDto } from '../dto/create-sale-order-ap-header.dto';

export class CreateSaleOrderApprovalHeaderMapper {
  static toPrismaCreateInput(
    dto: CreateSaleOrderApprovalHeaderDto,
so_approval_no: string,
headerDocTotals: any,
  ): Prisma.sale_order_approval_headerCreateInput {
    return {
        so_approval_no: so_approval_no,
        so_header: { connect: { so_id: dto.so_id } },
        so_approval_date: new Date(),
      customer: { connect: { customer_id: dto.customer_id } },
      branch: { connect: { branch_id: dto.branch_id } },

      status: dto.status || "DRAFT",
      ship_days: dto.ship_days,
      remarks: dto.remarks || "",
      payment_term_days: dto.payment_term_days,
      onhold: dto.onhold || "N",
      status_remark: dto.status_remark || "",


      approval_emp: { connect: { employee_id: dto.approval_emp_id } },
      approval_emp_name: dto.approval_emp_name,

        base_currency_code: dto.base_currency_code,
      quote_currency_code: dto.quote_currency_code,
      exchange_rate: dto.exchange_rate,
      exchange_rate_date: dto.exchange_rate_date,

      base_total_amount: headerDocTotals.baseGrandTotal ?? headerDocTotals.grandTotal,
      quote_total_amount: headerDocTotals.grandTotal,

      tax_code: { connect: { tax_code_id: dto.tax_code_id } },
      tax_rate: headerDocTotals.taxRate?.toNumber() ?? 0,
      base_tax_amount: headerDocTotals.baseTaxAmount?.toNumber() ?? 0,
      quote_tax_amount: headerDocTotals.taxAmount?.toNumber() ?? 0,

      discount_expression: dto.discount_expression,
      base_discount_amount: headerDocTotals.baseDiscountAmount?.toNumber() ?? 0,
      quote_discount_amount: headerDocTotals.discountAmount?.toNumber() ?? 0,
            ...(dto.emp_sale_id
        ? { emp_sale: { connect: { employee_id: dto.emp_sale_id } } }
        : {}),

      sale_area: { connect: { sale_area_id: dto.sale_area_id } },
      emp_dept: { connect: { emp_dept_id: dto.emp_dept_id } },
      project: { connect: { project_id: dto.project_id } },
    };
  }
}