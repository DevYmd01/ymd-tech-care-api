import { Prisma } from "@prisma/client";
import { CreateSaleQuotationLineDto } from "../dto/create-sale-quotation-line.dto";

export class CreateSaleQuotationLineMapper {
    static toPrismaCreateInput(
        data: CreateSaleQuotationLineDto,
        calc: {
                    subtotal: Prisma.Decimal;
                    discountAmount: Prisma.Decimal;
                    netAmount: Prisma.Decimal;
                },
        sq_header_id: number,
            ): Prisma.sale_quotation_lineCreateInput {
                return {
                    sq_header: { connect: { sq_id: sq_header_id } },
                    item: { connect: { item_id: data.item_id } },
                    note: data.note,
                    qty: data.qty,
                    uom: { connect: { uom_id: data.uom_id } },
                    unit_price: data.unit_price,
                    ...(data.tax_code_id
  ? {
      tax_code: {
        connect: {
          tax_code_id: data.tax_code_id,
        },
      },
    }
  : {}),
                    discount_expression: data.discount_expression,
                    discount_amount: calc.discountAmount,
                    net_amount: calc.netAmount,
                    status: "Active"
                }
                }
            }

