// // test-policy.ts

import { PolicyBuilder }
from './src/common/inventory/inventory-policy/policy-builder';


// IN
console.log(
  PolicyBuilder.build({
    stock_effect_ic: 1,
    transaction_type: 'IN',
  }),
);

// OUT
console.log(
  PolicyBuilder.build({
    stock_effect_ic: 2,
    transaction_type: 'OUT',
  }),
);

// RESERVE
console.log(
  PolicyBuilder.build({
    stock_effect_ic: 3,
    transaction_type: 'RESERVE',
  }),
);

// RELEASE
console.log(
  PolicyBuilder.build({
    stock_effect_ic: 4,
    transaction_type: 'RELEASE',
  }),
);

// NONE
console.log(
  PolicyBuilder.build({
    stock_effect_ic: 0,
    transaction_type: 'NONE',
  }),
);


// ////////////////////////////////////


// import { StockService } from './src/common/inventory/stock/stock.service';

// async function run() {
//   const service = new StockService();

// await service.processTransaction({
//   item_id: 1,
//   lot_id: 1,
//   warehouse_id: 1,
//   location_id: 1,
//   qty: 5,
//   stock_effect_ic: 2, // OUT
//   transaction_type: 'OUT',
//   document_type: 'ISSUE',
// });
// }

// run();