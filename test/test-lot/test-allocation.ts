import { StockCommitService }
from '../../src/common/inventory/lot-balance/commit/stock-commit.service';

async function main() {

  const result =
    await StockCommitService.commit(

      // ==================================================
      // ALLOCATIONS
      // ==================================================
      [
        {
          lot_id: 1,

          item_lot_balance_id: 1,

          qty: 20,
        },
      ],

      // ==================================================
      // POLICY
      // ==================================================
      {
        document_type: 'ISSUE',

        transaction_type: 'OUT',

        on_hand_sign: -1,

        reserved_sign: 0,

        available_sign: -1,
      },

    );

  console.log(result);
}

main();