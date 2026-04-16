import { PrismaClient } from "@prisma/client"

export interface PricingContext {
  /**
   * Prisma instance
   */
  prisma: PrismaClient

  /**
   * สินค้าที่กำลังเลือก
   */
  item_id: number

  /**
   * ลูกค้า (ถ้ามี)
   */
  customer_id?: number

  /**
   * หน่วยขาย เช่น ชิ้น / กล่อง / ลัง
   */
  uom_id?: number

  /**
   * สาขาที่ทำรายการ
   */
  branch_id?: number

  /**
   * จำนวนที่ขาย
   */
  qty?: number

  /**
   * วันที่เอกสาร / วันที่ใช้คำนวณราคา
   */
  date: Date

  /**
   * เครดิตเทอม (วัน) ถ้าต้องใช้ rule CREDIT_TERM
   */
  credit_term_days?: number

  /**
   * currency (ถ้ารองรับหลายสกุลเงิน)
   */
  currency_id?: number

  /**
   * price list override กรณีพิเศษ
   */
  price_list_id?: number
}