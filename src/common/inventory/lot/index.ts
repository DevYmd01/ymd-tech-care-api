/**
 * ============================================================
 * File: src/common/inventory/lot/index.ts
 * ============================================================
 * หน้าที่:
 * รวม export ของระบบ LOT ทั้งหมด (Barrel File)
 *
 * ข้อดี:
 * - import สั้นลง
 * - โครงสร้างสะอาด
 * - จัดการไฟล์กลางง่าย
 *
 * จากเดิม:
 * import { GetAvailableLotService } from './service/get-available-lot.service';
 *
 * เปลี่ยนเป็น:
 * import { GetAvailableLotService } from '@/common/inventory/lot';
 * ============================================================
 */

/* ============================================================
   SERVICE LAYER
   ------------------------------------------------------------
   Service = Use Case หลักของระบบ LOT
   ============================================================ */

/**
 * ดึง LOT ที่สามารถใช้งานได้
 * เช่น:
 * - qty_available > 0
 * - status ACTIVE
 * - ไม่หมดอายุ
 * - เรียง FIFO / FEFO
 */
export * from './service/get-available-lot.service';

/**
 * กระจายจำนวนที่ต้องการไปตาม LOT
 *
 * ตัวอย่าง:
 * ต้องการ 120 ชิ้น
 *
 * LOT001 = 100
 * LOT002 = 50
 *
 * ผลลัพธ์:
 * [
 *   { lot_no: 'LOT001', qty: 100 },
 *   { lot_no: 'LOT002', qty: 20 }
 * ]
 */
export * from './service/allocate-lot.service';

/**
 * จองจำนวนที่ต้องการไปตาม LOT
 **/
export * from './service/reserve-lot.service';

/* ============================================================
   RULE LAYER
   ------------------------------------------------------------
   Rule = กฎธุรกิจของ LOT
   ============================================================ */

/**
 * FIFO Rule
 * First In First Out
 *
 * LOT เก่าก่อนใช้ก่อน
 * เรียงจาก mfg_date ASC
 */
export * from './rule/fifo.rule';

/**
 * Block Expired Rule
 *
 * ตัด LOT ที่หมดอายุออก
 *
 * expiry_date < วันนี้
 * = ห้ามใช้
 */
export * from './rule/block-expired.rule';

/* ============================================================
   TYPES (เพิ่มในอนาคต)
   ============================================================ */

/**
 * ถ้ามี type เพิ่ม เช่น:
 *
 * export * from './types/allocation-result.type';
 * export * from './types/lot.type';
 */

/* ============================================================
   FUTURE SERVICES (เพิ่มภายหลัง)
   ============================================================ */

/**
 * reserve-lot.service.ts
 * - update reserved qty
 * - create reservation line
 *
 * release-lot.service.ts
 * - คืน qty ที่จอง
 *
 * issue-lot.service.ts
 * - ตัด stock จริง
 */