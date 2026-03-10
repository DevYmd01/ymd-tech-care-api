import { Prisma } from '@prisma/client';

type Discount =
    | { type: 'NONE' }
    | { type: 'RATE'; rate: number }      // เช่น 0.1 = 10%
    | { type: 'AMOUNT'; amount: number };

interface CalculatePriceInput {
    unitPrice: number;
    quantity: number;
    discount?: Discount;
}

interface CalculateHeaderInput {
    subtotal: number;
    discount?: Discount;
    taxRate?: number;
    exchangeRate?: number; // rate จาก quote → base
}

export class PriceCalculator {
    static calculate(input: CalculatePriceInput) {
        const unitPrice = new Prisma.Decimal(input.unitPrice);
        const quantity = new Prisma.Decimal(input.quantity);

        const subtotal = unitPrice.mul(quantity);

        let discountAmount = new Prisma.Decimal(0);

        if (input.discount) {
            if (input.discount.type === 'RATE') {
                discountAmount = subtotal.mul(input.discount.rate);
            }

            if (input.discount.type === 'AMOUNT') {
                discountAmount = new Prisma.Decimal(input.discount.amount);
            }
        }

        const netAmount = subtotal.minus(discountAmount);


        return {
            subtotal,
            discountAmount,
            netAmount,
        };
    }

static calculateHeader(input: CalculateHeaderInput) {
  const subtotal = new Prisma.Decimal(input.subtotal);

  let discountAmount = new Prisma.Decimal(0);

  if (input.discount?.type === 'RATE') {
    discountAmount = subtotal.mul(input.discount.rate);
  }

  if (input.discount?.type === 'AMOUNT') {
    discountAmount = new Prisma.Decimal(input.discount.amount);
  }

  const netAmount = subtotal.minus(discountAmount);

  // ✅ บังคับให้เป็น Decimal เสมอ
  const taxRate =
    input.taxRate !== undefined
      ? new Prisma.Decimal(input.taxRate)
      : null;

  const taxAmount =
    taxRate !== null
      ? netAmount.mul(taxRate)
      : new Prisma.Decimal(0);

  const grandTotal = netAmount.plus(taxAmount);

  const exchangeRate = input.exchangeRate;

  const baseSubtotal =
    exchangeRate ? subtotal.mul(exchangeRate) : null;

  const baseDiscountAmount =
    exchangeRate ? discountAmount.mul(exchangeRate) : null;

  const baseNetAmount =
    exchangeRate ? netAmount.mul(exchangeRate) : null;

  const baseTaxAmount =
    exchangeRate ? taxAmount.mul(exchangeRate) : null;

  const baseGrandTotal =
    exchangeRate ? grandTotal.mul(exchangeRate) : null;

  return {
    // quote currency
    subtotal,
    discountAmount,
    netAmount,
    taxRate,
    taxAmount,
    grandTotal,

    // base currency
    baseSubtotal,
    baseDiscountAmount,
    baseNetAmount,
    baseTaxAmount,
    baseGrandTotal,
  };
}
}

