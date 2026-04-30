// d:/project01/ymd-tech-care-api/src/common/inventory/stock-options/service/lot-allocation.service.ts

import { Injectable } from '@nestjs/common';

type AllocationMode = 'FIFO' | 'FEFO';

interface AllocateInput {
  lots: any[];              // rows จาก stockOptionsQuery (ต้องมี display_qty)
  requiredQty: number;      // qty ที่ต้องการใช้
  mode?: AllocationMode;    // FIFO | FEFO (default FIFO)
}

interface AllocationResult {
  allocations: {
    lot_id: number;
    warehouse_id: number;
    location_id: number;
    pick_qty: number;
    ref?: any; // เก็บ row เดิมไว้ใช้งานต่อ
  }[];
  total_allocated: number;
  remaining_qty: number;
}

@Injectable()
export class LotAllocationService {

  allocateLots(input: AllocateInput): AllocationResult {
    const {
      lots,
      requiredQty,
      mode = 'FIFO',
    } = input;

    if (!requiredQty || requiredQty <= 0) {
      return {
        allocations: [],
        total_allocated: 0,
        remaining_qty: 0,
      };
    }

    // =====================================
    // 1. SORT LOTS
    // =====================================
    let sortedLots = [...lots];

    if (mode === 'FEFO') {
      sortedLots.sort((a, b) => {
        const aDate = new Date(a.lot?.expiry_date || 0).getTime();
        const bDate = new Date(b.lot?.expiry_date || 0).getTime();
        return aDate - bDate; // ใกล้หมดอายุก่อน
      });
    } else {
      // FIFO (default)
      sortedLots.sort((a, b) => {
        const aDate = new Date(a.lot?.mfg_date || a.updated_at).getTime();
        const bDate = new Date(b.lot?.mfg_date || b.updated_at).getTime();
        return aDate - bDate; // เข้าก่อนออกก่อน
      });
    }

    // =====================================
    // 2. ALLOCATE
    // =====================================
    let remaining = requiredQty;
    const allocations: AllocationResult['allocations'] = [];

    for (const lot of sortedLots) {
      if (remaining <= 0) break;

      const available = Number(lot.display_qty || 0);

      if (available <= 0) continue;

      const pickQty = Math.min(available, remaining);

      allocations.push({
        lot_id: lot.lot_id,
        warehouse_id: lot.warehouse_id,
        location_id: lot.location_id,
        pick_qty: pickQty,
        ref: lot, // optional: เอาไว้ใช้ต่อ เช่น update stock
      });

      remaining -= pickQty;
    }

    // =====================================
    // 3. RESULT
    // =====================================
    const totalAllocated = allocations.reduce(
      (sum, a) => sum + a.pick_qty,
      0,
    );

    return {
      allocations,
      total_allocated: totalAllocated,
      remaining_qty: remaining,
    };
  }
}