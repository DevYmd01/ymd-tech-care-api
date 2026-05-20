import { PrismaClient } from '@prisma/client';

import { AllocationLine, CommitPolicy }
from './allocation.types';

const prisma = new PrismaClient();



export class StockCommitService {

  static async commit(

    allocations: AllocationLine[],

    policy: CommitPolicy,

  ) {

    return prisma.$transaction(

      async (tx) => {

        for (const row of allocations) {

          // ==================================================
          // FIND BALANCE
          // ==================================================

          const balance =
            await tx.item_lot_balance.findUnique({

              where: {
                lot_balance_id:
                  row.item_lot_balance_id,
              },

            });

          // ==================================================
          // BALANCE NOT FOUND
          // ==================================================

          if (!balance) {

            throw new Error(
              'BALANCE NOT FOUND'
            );
          }

          // ==================================================
          // RECHECK STOCK
          // ==================================================

          if (

            Number(balance.qty_available) <
              Number(row.qty) ||

            Number(balance.qty_on_hand) <
              Number(row.qty)

          ) {

            throw new Error(
              'INSUFFICIENT STOCK'
            );
          }

          // ==================================================
          // CALCULATE NEXT BALANCE
          // ==================================================

          const nextOnHand =

            Number(balance.qty_on_hand) +

            (
              Number(row.qty) *
              Number(policy.on_hand_sign)
            );

          const nextReserved =

            Number(balance.qty_reserved) +

            (
              Number(row.qty) *
              Number(policy.reserved_sign)
            );

          const nextAvailable =

            Number(balance.qty_available) +

            (
              Number(row.qty) *
              Number(policy.available_sign)
            );

          // ==================================================
          // UPDATE BALANCE
          // ==================================================

          await tx.item_lot_balance.update({

            where: {
              lot_balance_id:
                row.item_lot_balance_id,
            },

            data: {

              qty_on_hand:
                nextOnHand,

              qty_reserved:
                nextReserved,

              qty_available:
                nextAvailable,

            },

          });

          // ==================================================
          // INSERT TRANSACTION LOG
          // ==================================================

          await tx.lot_transaction.create({

            data: {

              lot_id:
                row.lot_id,

              item_id:
                balance.item_id,

              warehouse_id:
                balance.warehouse_id,

              location_id:
                balance.location_id,

              branch_id:
                balance.branch_id,

              qty:
                row.qty,

              trans_type:
                policy.transaction_type,

            },

          });

        }

        return true;
      }

    );

  }

}