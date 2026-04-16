/**
 * ประเภทการหาราคา
 *
 * ใช้กับ:
 * - ic_option.set_price1
 * - ic_option.set_price2
 * - ic_option.set_price3
 * - ic_option.set_price4
 */
export const IC_PRICE_TYPE = {
  /**
   * ไม่กำหนด
   */
  NONE: 0,

  /**
   * ราคาจาก Price List
   */
  PRICE_LIST: 1,

  /**
   * ราคาตามระดับลูกค้า
   */
  PRICE_LEVEL: 2,

  /**
   * ราคาจาก Promotion
   */
  PROMOTION: 3,

  /**
   * ราคาตามเครดิตเทอม
   */
  CREDIT_TERM: 4,

  /**
   * ราคาจากการขายล่าสุด
   */
  LAST_SALE: 5,

  /**
   * ราคาขายล่าสุดตามลูกค้า
   */
  LAST_SALE_BY_CUSTOMER: 6,
} as const

/**
 * union type
 * 0 | 1 | 2 | 3 | 4 | 5 | 6
 */
export type PriceType =
  typeof IC_PRICE_TYPE[keyof typeof IC_PRICE_TYPE]

/**
 * ใช้แสดงชื่อ readable
 */
export const IC_PRICE_TYPE_LABEL = {
  0: "NONE",
  1: "PRICE_LIST",
  2: "PRICE_LEVEL",
  3: "PROMOTION",
  4: "CREDIT_TERM",
  5: "LAST_SALE",
  6: "LAST_SALE_BY_CUSTOMER",
} as const