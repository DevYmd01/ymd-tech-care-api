import { AllocationLine } from './allocation.types';

export class FEFOEngine {

  static execute(balances: any[], qty: number): AllocationLine[] {

    let remaining = qty;
    const result: AllocationLine[] = [];

    const sorted = balances.sort(
      (a, b) =>
        new Date(a.lot?.expiry_date ?? 0).getTime() -
        new Date(b.lot?.expiry_date ?? 0).getTime()
    );

    for (const b of sorted) {

      if (remaining <= 0) break;

      const available = Number(b.qty_available);
      if (available <= 0) continue;

      const used = Math.min(available, remaining);

      result.push({
        lot_id: b.lot_id,
        lot_no: b.lot?.lot_no,
        item_lot_balance_id: b.lot_balance_id,
        qty: used,
        available_qty: available,
        expiry_date: b.lot?.expiry_date,
        warehouse_id: b.warehouse_id,
        location_id: b.location_id,
      });

      remaining -= used;
    }

    return result;
  }
}