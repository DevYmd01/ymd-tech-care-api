
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

Injectable()
export class StockSoAllocationService {

    async allocate(
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

        if (Number(balance.qty_booked) < qty) {
            throw new Error(
                'ALLOCATE QTY EXCEEDS BOOKED QTY',
            );
        }

        const qtyBooked =
            Number(balance.qty_booked) - qty;

        const qtySoAllocated =
            Number(balance.qty_so_allocated) + qty;

        const qtyReserved =
            qtyBooked +
            qtySoAllocated +
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
                qty_so_allocated: qtySoAllocated,
                qty_reserved: qtyReserved,
                qty_available: qtyAvailable,
            },
        });
    }

    async unallocate(
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

        if (Number(balance.qty_so_allocated) < qty) {
            throw new Error(
                'UNALLOCATE QTY EXCEEDS ALLOCATED QTY',
            );
        }

        const qtyBooked =
            Number(balance.qty_booked) + qty;

        const qtySoAllocated =
            Number(balance.qty_so_allocated) - qty;

        const qtyReserved =
            qtyBooked +
            qtySoAllocated +
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
                qty_so_allocated: qtySoAllocated,
                qty_reserved: qtyReserved,
                qty_available: qtyAvailable,
            },
        });
    }
}