import { UpdatePriceListLineDto } from '../dto/update-price-list-line.dto';
import { Prisma } from '@prisma/client';
export class UpdatePriceListLineMapper {
    static toPrismaUpdateInput(
        dto: UpdatePriceListLineDto,
        price_list_header_id: number,
        calc: {
            subtotal: Prisma.Decimal;
            discountAmount: Prisma.Decimal;
            netAmount: Prisma.Decimal;
        }
    ): Prisma.price_list_item_lineUpdateInput {
        return {
            price_list_header: { connect: { price_list_header_id } },
            remarks: dto.remarks,
            item: { connect: { item_id: dto.item_id } },
            uom: { connect: { uom_id: dto.uom_id } },
            unit_price: dto.unit_price,
            line_discount_rate: dto.line_discount_rate,
            line_discount_amount: calc.discountAmount,
            unit_price_net: calc.netAmount,
            editflag: dto.editflag,
        };
    }
}