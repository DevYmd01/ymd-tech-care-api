import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class GetAvailableLotService {
  constructor(private readonly prisma: PrismaService) {}

  async execute(
    itemId: number,
    branchId: number,
    warehouseId: number,
  ) {
    const ic = await this.prisma.ic_option.findUnique({
      where: { branch_id: branchId },
      include: {
        icOptionLists: true,
      },
    });

    // default = FEFO
    let orderBy: any = {
      lot: {
        expiry_date: 'asc',
      },
    };

    // ถ้ามี config เปลี่ยนเป็น FIFO
    if (ic?.icOptionLists?.some(x => x.sort_order === 1)) {
      orderBy = {
        lot: {
          mfg_date: 'asc',
        },
      };
    }

    return this.prisma.item_lot_balance.findMany({
      where: {
        item_id: itemId,
        branch_id: branchId,
        warehouse_id: warehouseId,
        qty_available: {
          gt: 0,
        },
        lot: {
          status: 'ACTIVE',
        },
      },
      include: {
        lot: true,
      },
      orderBy,
    });
  }
}