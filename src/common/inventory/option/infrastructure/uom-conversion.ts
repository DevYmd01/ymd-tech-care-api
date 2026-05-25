import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class UomConversionReader {

  static async toBaseQty(
    item_uom_id: number,
    qty: number,
  ): Promise<number> {

    const itemUom =
      await prisma.item_uom.findFirst({
        where: {
          item_uom_id,
        },
      });

    if (!itemUom) {
      throw new Error('Item UOM not found');
    }

    const factor = Number(itemUom.factor) * qty;

    return factor ;
  }
}