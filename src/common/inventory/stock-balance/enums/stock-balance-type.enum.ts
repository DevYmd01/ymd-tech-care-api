export enum StockTransactionType {
  RECEIVE = 'RECEIVE',   // ของเข้า
  ISSUE = 'ISSUE',       // ของออก
  RESERVE = 'RESERVE',   // จองของ
  RELEASE = 'RELEASE',   // ปล่อยจอง
  TRANSFER = 'TRANSFER', // ย้ายคลัง
  ADJUST = 'ADJUST',     // ปรับยอด (ตรวจนับ / แก้ไข)
}

export enum StockRefDocType {
  PURCHASE_ORDER = 'PURCHASE_ORDER',     // ซื้อของ
  SALES_ORDER = 'SALES_ORDER',           // ขายของ
  TRANSFER_IN = 'TRANSFER_IN',           // รับโอน
  TRANSFER_OUT = 'TRANSFER_OUT',         // ส่งโอน
  STOCK_COUNT = 'STOCK_COUNT',           // ตรวจนับ
  MANUAL_ADJUST = 'MANUAL_ADJUST',       // ปรับมือ
  RETURN = 'RETURN',                     // คืนสินค้า
  SYSTEM = 'SYSTEM',                     // ระบบทำเอง
  ISSUE_STOCK = 'ISSUE_STOCK',           // ออกสต็อก (ขาย/เบิก/ใช้)
  RECEIVE_STOCK = 'RECEIVE_STOCK',       // รับสต็อก (ซื้อ/รับเข้า)
  ADJUST_STOCK = 'ADJUST_STOCK',         // ปรับสต็อก (ตรวจนับ/แก้ไข)
}

