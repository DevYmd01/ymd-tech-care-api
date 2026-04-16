import { priceHandlers } from "../handlers"
import {
  IC_PRICE_TYPE_LABEL,
  PriceType,
} from "../constants/price-type"
import { PricingContext } from "../types/pricing-context"

export async function getPriceByPriority(
  option: {
    set_price1?: number | null
    set_price2?: number | null
    set_price3?: number | null
    set_price4?: number | null
  },
  ctx: PricingContext
) {
  const priorities = [
    { priority: 1, type: option.set_price1 },
    { priority: 2, type: option.set_price2 },
    { priority: 3, type: option.set_price3 },
    { priority: 4, type: option.set_price4 },
  ]

  for (const row of priorities) {
    const type = row.type as PriceType | null

    /**
     * ข้ามถ้าไม่ได้ตั้งค่า
     * NONE = 0
     */
    if (
      type === null ||
      type === undefined ||
      type === 0
    ) {
      continue
    }

    const handler = priceHandlers[type]

    /**
     * ไม่มี handler รองรับ
     */
    if (!handler) continue

    const price = await handler(ctx)

    /**
     * เจอราคาแล้วหยุดทันที
     */
    if (price !== null) {
      return {
        price,
        source: type,
        source_name:
          IC_PRICE_TYPE_LABEL[type],
        priority: row.priority,
      }
    }
  }

  /**
   * ไม่เจอราคาเลย
   */
  return null
}