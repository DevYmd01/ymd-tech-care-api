import { IC_PRICE_TYPE } from "../constants/price-type"
import { getPriceFromPriceList } from "./price-list.handler"
import { getPriceFromPriceLevel } from "./price-level.handler"

export const priceHandlers = {
  [IC_PRICE_TYPE.PRICE_LIST]: getPriceFromPriceList,
  [IC_PRICE_TYPE.PRICE_LEVEL]: getPriceFromPriceLevel,
}