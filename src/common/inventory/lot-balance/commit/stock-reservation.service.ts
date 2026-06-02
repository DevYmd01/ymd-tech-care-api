import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class StockReservationService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async reserve(
    tx: Prisma.TransactionClient,
    itemLotBalanceId: number,
    qty: number,
  ) {

    const balance =
      await tx.item_lot_balance.findUnique({
        where: {
          lot_balance_id: itemLotBalanceId,
        },
      });

    if (!balance) {
      throw new Error('BALANCE NOT FOUND');
    }

    const qtyBooked =
      Number(balance.qty_booked) + qty;

    const qtyReserved =
      qtyBooked +
      Number(balance.qty_so_allocated) +
      Number(balance.qty_pending_issue);

    const qtyAvailable =
      Number(balance.qty_on_hand) -
      qtyReserved;

    return tx.item_lot_balance.update({
      where: {
        lot_balance_id: itemLotBalanceId,
      },
      data: {
        qty_booked: qtyBooked,
        qty_reserved: qtyReserved,
        qty_available: qtyAvailable,
      },
    });
  }

  async unreserve(
    tx: Prisma.TransactionClient,
    itemLotBalanceId: number,
    qty: number,
  ) {

    const balance =
      await tx.item_lot_balance.findUnique({
        where: {
          lot_balance_id: itemLotBalanceId,
        },
      });

    if (!balance) {
      throw new Error('BALANCE NOT FOUND');
    }

    const qtyBooked =
      Number(balance.qty_booked) - qty;

    const qtyReserved =
      qtyBooked +
      Number(balance.qty_so_allocated) +
      Number(balance.qty_pending_issue);

    const qtyAvailable =
      Number(balance.qty_on_hand) -
      qtyReserved;

    return tx.item_lot_balance.update({
      where: {
        lot_balance_id: itemLotBalanceId,
      },
      data: {
        qty_booked: qtyBooked,
        qty_reserved: qtyReserved,
        qty_available: qtyAvailable,
      },
    });
  }
}