import { PricingContext } from "../types/pricing-context"

/**
 * price_level ของ customer จะชี้ไป table price_level
 * จากนั้นเอา level_no ไปเลือก column:
 *
 * level_no = 1 => item_price1
 * level_no = 2 => item_price2
 * ...
 * level_no = 10 => item_price10
 */
export async function getPriceFromPriceLevel(
  ctx: PricingContext
): Promise<number | null> {
  const {
    prisma,
    item_id,
    customer_id,
    uom_id,
    qty = 1,
  } = ctx

  // ต้องมี customer
  if (!customer_id) return null

  /**
   * 1) หา customer + price level
   */
  const customer = await prisma.customer.findUnique({
    where: { customer_id },
    select: {
      is_active: true,
      price_level: {
        select: {
          id: true,
          level_no: true,
        },
      },
    },
  })

  if (!customer) return null
  if (!customer.is_active) return null
  if (!customer.price_level) return null

  const levelNo = customer.price_level.level_no

  // รองรับ 1 - 10
  if (levelNo < 1 || levelNo > 10) return null

  /**
   * 2) หา multi price ตาม qty
   * item_from_qty <= qty
   */
  const row = await prisma.multi_price_item.findFirst({
    where: {
      item_id,

      ...(uom_id ? { uom_id } : {}),

      item_from_qty: {
        lte: qty,
      },
    },
    orderBy: {
      item_from_qty: "desc",
    },
  })

  if (!row) return null

  /**
   * 3) dynamic column
   * level_no = 3 => item_price3
   */
  const priceField =
    `item_price${levelNo}` as keyof typeof row

  const priceValue = row[priceField]

  if (!priceValue) return null

  return Number(priceValue)
}