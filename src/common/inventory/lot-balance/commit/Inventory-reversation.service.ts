import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';
import { UomConversionService } from '@/common/uom/item-uom/service/uom-conversion.service';
import { StockReservationService } from './stock-reservation.service';

@Injectable()
export class InventoryReservationService {

  constructor(
    // Inject services needed for reservation logic
    private readonly prisma: PrismaService,
    private readonly uomConversionService: UomConversionService,
    private readonly stockReservationService: StockReservationService,
  ) {}

    // ==================================================
    // Reservation FUNCTIONS
    // ==================================================
     async reserve(tx: Prisma.TransactionClient, input: {
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
    return this.stockReservationService.reserve(
      tx,
      input.item_lot_balance_id,
      qtyBase,
    );
  }

  async unreserve(tx: Prisma.TransactionClient, input: {
    item_lot_balance_id: number;
    item_uom_id: number;
    qty: number;
  }) {

    const qtyBase = await this.uomConversionService.toBaseQty(
      input.item_uom_id,
      input.qty,
    );

    return this.stockReservationService.unreserve(
      tx,
      input.item_lot_balance_id,
      qtyBase,
    );
  }
}