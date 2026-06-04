import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { UomConversionService } from '@/common/uom/item-uom/service/uom-conversion.service';
import { StockSoAllocationService } from './stock-so-allocation.service';

@Injectable()
export class InventorySoAllocationService {

  constructor(
    // Inject services needed for reservation logic
    private readonly prisma: PrismaService,
    private readonly uomConversionService: UomConversionService,
    private readonly stockSoAllocationService: StockSoAllocationService,
  ) {}

    // ==================================================
    // SO ALLOCATION FUNCTIONS
    // ==================================================
     async allocate(tx: Prisma.TransactionClient, input: {
    item_lot_balance_id: number;
    item_uom_id: number;
    qty: number;
  }) {

    // 1. แปลง UOM → base
    const qtyBase = await this.uomConversionService.toBaseQty(
      input.item_uom_id,
      input.qty,
    );

    // 2. commit reservation (booked)
    return this.stockSoAllocationService.allocate(
      tx,
      input.item_lot_balance_id,
      qtyBase,
    );
  }

  async unallocate(tx: Prisma.TransactionClient, input: {
    item_lot_balance_id: number;
    item_uom_id: number;
    qty: number;
  }) {

    const qtyBase = await this.uomConversionService.toBaseQty(
      input.item_uom_id,
      input.qty,
    );

    return this.stockSoAllocationService.unallocate(
      tx,
      input.item_lot_balance_id,
      qtyBase,
    );
  }
}