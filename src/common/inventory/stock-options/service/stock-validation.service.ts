// d:/project01/ymd-tech-care-api/src/common/inventory/stock-options/stock-validation.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class StockValidationService {
  /**
   * Groups item lot balance data based on the negative stock mode.
   * @param mappedRows The item lot balance rows with display_qty.
   * @param negativeStockMode The mode for grouping (0: default, 1: total, 2: by warehouse, 3: by warehouse and location).
   * @param itemId The item ID for total grouping (used when grouping by total).
   * @returns Grouped data.
   */
  groupByMode(
    mappedRows: any[],
    negativeStockMode: number,
    itemId?: number,
  ): any[] {
    let grouped: any[] = [];

    // 1 = รวมคลัง (Total)
    if (negativeStockMode === 1) {
      const total = mappedRows.reduce(
        (sum, r) => sum + r.display_qty,
        0,
      );

      grouped = [
        {
          item_id: itemId,
          display_qty: total,
        },
      ];
    }
    // 2 = แยกคลัง (By Warehouse)
    else if (negativeStockMode === 2) {
      const map = new Map();

      for (const r of mappedRows) {
        const key = r.warehouse_id;

        if (!map.has(key)) {
          map.set(key, {
            warehouse_id: r.warehouse_id,
            warehouse: r.warehouse,
            display_qty: 0,
          });
        }

        map.get(key).display_qty += r.display_qty;
      }

      grouped = Array.from(map.values());
    }
    // 3 = แยกคลัง + location (By Warehouse and Location)
    else if (negativeStockMode === 3) {
      const map = new Map();

      for (const r of mappedRows) {
        const key = `${r.warehouse_id}_${r.location_id}`;

        if (!map.has(key)) {
          map.set(key, {
            warehouse_id: r.warehouse_id,
            warehouse: r.warehouse,
            location_id: r.location_id,
            location: r.location,
            display_qty: 0,
          });
        }

        map.get(key).display_qty += r.display_qty;
      }

      grouped = Array.from(map.values());
    }
    // 0 = Default (no grouping, return original mapped rows)
    else {
      grouped = mappedRows;
    }

    return grouped;
  }

  /**
   * Validates stock based on the required quantity and negative stock check setting.
   * @param requiredQty The quantity requested.
   * @param totalAvailableQty The total available quantity from grouped stock.
   * @param negativeStockCheck The setting for negative stock (1: disallow, 2: allow, 3: warn, 4: item-specific).
   * @returns An object indicating if stock can be used and any warning message.
   */
  validateStock(
    requiredQty: number | undefined,
    totalAvailableQty: number,
    negativeStockCheck: number,
  ): { can_use: boolean; warning_message: string | null } {
    let can_use = true;
    let warning_message: string | null = null;

    if (requiredQty && requiredQty > totalAvailableQty) {
      // 1 = ห้ามติดลบ
      if (negativeStockCheck === 1) {
        can_use = false;
        warning_message = 'สินค้าไม่พอ ไม่อนุญาตติดลบ';
      }
      // 2 = ติดลบได้ (no warning)
      else if (negativeStockCheck === 2) {
        can_use = true;
        warning_message = null;
      }
      // 3 = ถามก่อนใช้ (warn)
      else if (negativeStockCheck === 3) {
        can_use = true; // Still allowed, but with a warning
        warning_message = 'สินค้าไม่พอ ต้องการดำเนินการต่อหรือไม่';
      }
      // 4 = ตามรายตัวสินค้า (warn, but actual check is elsewhere)
      else if (negativeStockCheck === 4) {
        can_use = true; // Still allowed, but with a warning
        warning_message = 'ตรวจสอบตามการตั้งค่ารายสินค้า';
      }
    }

    return { can_use, warning_message };
  }

  buildLotDetails(
  rows: any[],
  requiredQty?: number,
) {
  let remaining = requiredQty || 0;

  return rows.map((row) => {
    const available = Number(row.display_qty);

    let pick_qty = 0;

    if (remaining > 0) {
      pick_qty = Math.min(available, remaining);
      remaining -= pick_qty;
    }

    return {
      ...row,
      pick_qty,
    };
  });
}
}
