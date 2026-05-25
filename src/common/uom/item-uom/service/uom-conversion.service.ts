import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class UomConversionService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async toBaseQty(
    item_uom_id: number,
    qty: number,
  ): Promise<number> {

    const itemUom =
      await this.prisma.item_uom.findFirst({
        where: {
          item_uom_id,
        },
      });

    if (!itemUom) {
      throw new Error('Item UOM not found');
    }

    const factor =
      Number(itemUom.factor);

    return factor * qty;
  }
}