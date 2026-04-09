import { CreatePriceListLineDto } from '../dto/create-price-list-line.dto';
import { Prisma } from '@prisma/client';

export class CreatePriceListLineMapper {
    static toPrismaCreateInput(
        dto: CreatePriceListLineDto,
        price_list_header_id: number,
        calc: {
            subtotal: Prisma.Decimal;
            discountAmount: Prisma.Decimal;
            netAmount: Prisma.Decimal;
        }
    ): Prisma.price_list_item_lineCreateInput {
        return {
            price_list_header: { connect: { price_list_header_id } },

            remarks: dto.remarks,

            item: { connect: { item_id: dto.item_id } },
            uom: { connect: { uom_id: dto.uom_id } },

            unit_price: dto.unit_price,

            line_discount_rate: dto.line_discount_rate,

            // ✅ ใช้ค่าจาก Domain เท่านั้น
            line_discount_amount: calc.discountAmount,
            unit_price_net: calc.netAmount,

            editflag: dto.editflag,
        };
    }

    static toPrismaCreateManyInput(
        dto: CreatePriceListLineDto,
        price_list_header_id: number,
        calc: {
            subtotal: Prisma.Decimal;
            discountAmount: Prisma.Decimal;
            netAmount: Prisma.Decimal;
        }
    ): Prisma.price_list_item_lineCreateManyInput {
        return {
            price_list_header_id,

            remarks: dto.remarks,

            item_id: dto.item_id,
            uom_id: dto.uom_id,

            unit_price: dto.unit_price,
            line_discount_rate: dto.line_discount_rate,
            line_discount_amount: calc.discountAmount,
            unit_price_net: calc.netAmount,
            editflag: dto.editflag,
        };
    }
}  