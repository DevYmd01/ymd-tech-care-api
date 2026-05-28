import { StockService } from '@/common/inventory/stock/stock.service';

async function run() {
  const service = new StockService();

await service.processTransaction({
  item_id: 1,
  lot_id: 1,
  warehouse_id: 1,
  location_id: 1,
  qty: 5,
  stock_effect_ic: 2, // OUT
  transaction_type: 'OUT',
  document_type: 'ISSUE',
});
}

run();