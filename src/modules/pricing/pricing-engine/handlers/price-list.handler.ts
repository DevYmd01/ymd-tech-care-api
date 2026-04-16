import { PricingContext } from "../types/pricing-context"

/**
 * PRICE LIST
 *
 * ใช้ schema จริงของคุณ:
 * - price_list_header
 * - price_list_item_line
 *
 * Priority:
 * 1. customer เฉพาะ
 * 2. customer group (ถ้ามีใน ctx)
 * 3. price list กลาง
 */
export async function getPriceFromPriceList(
    ctx: PricingContext
): Promise<number | null> {
    const {
        prisma, 
        item_id,
        customer_id,
        uom_id,
        branch_id,
        date,
    } = ctx

    /**
     * หา header ที่ใช้ได้
     */
    const header = await prisma.price_list_header.findFirst({
        where: {
            is_active: true,

            begin_date: {
                lte: date,
            },

            end_date: {
                gte: date,
            },

            ...(branch_id ? { branch_id } : {}),

            /**
             * ถ้ามี customer:
             * เอาเฉพาะ customer นี้ หรือ price list กลาง
             */
            ...(customer_id
                ? {
                    OR: [
                        { customer_id },
                        { customer_id: null },
                    ],
                }
                : {
                    customer_id: null,
                }),

            /**
             * ต้องแน่ใจว่า Header นี้มีสินค้านี้อยู่
             * ไม่อย่างนั้นจะจับ Header ผิดอันแล้วหา line ไม่เจอ
             */
            priceListItemLines: {
                some: {
                    item_id,
                    ...(uom_id ? { uom_id } : {}),
                }
            }
        },

        /**
         * customer เฉพาะมาก่อน
         * แล้วค่อยตัวกลาง
         */
        orderBy: [
            {
                customer_id: "desc",
            },
            {
                end_date: "asc"
            },
            {
                begin_date: "desc",
            },
        ],
        include: {
            priceListItemLines: {
                where: {
                    item_id,
                    ...(uom_id ? { uom_id } : {}),
                },
                take: 1
            }
        }
    })

    if (!header || header.priceListItemLines.length === 0) return null

    const line = header.priceListItemLines[0]

    if (!line) return null

    /**
     * ถ้ามี net ใช้ net ก่อน
     */
    if (line.unit_price_net) {
        return Number(line.unit_price_net)
    }

    if (line.unit_price) {
        return Number(line.unit_price)
    }

    return null
}