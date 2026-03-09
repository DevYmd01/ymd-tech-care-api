import { parseDiscountRaw } from '@/common/utils/discount.util';
import { PriceCalculator } from '@/common/calculators/price.calculator';

interface CalculateLineInput {
    unit_price: number;
    qty: number;
    discount_expression?: string;
}

interface CalculateHeaderTotalsInput {
    subtotal: number;
    discount_expression?: string;
    tax_rate?: number;
    exchange_rate?: number;
}


export class VqCalculationDomainService {

    calculateLine(input: CalculateLineInput) {
        const discount_amount = parseDiscountRaw(input.discount_expression);

        return PriceCalculator.calculate({
            unitPrice: input.unit_price,
            quantity: input.qty,
            discount: discount_amount,
        });
    }

    // ฟังก์ชันนี้จะเรียกใช้ calculateLine และทำการปัดเศษผลลัพธ์ให้เป็นทศนิยม 2 ตำแหน่ง
    calculateLineAmount(input: CalculateLineInput) {
        const result = this.calculateLine(input);
        // ควร control rounding ตรงนี้
        return result.netAmount.toDecimalPlaces(2).toNumber();
    }


    // ฟังก์ชันนี้จะเรียกใช้ calculateHeaderTotals และทำการปัดเศษผลลัพธ์ให้เป็นทศนิยม 2 ตำแหน่ง
    calculateHeaderTotal(input: CalculateHeaderTotalsInput) {

        const discount_amount = parseDiscountRaw(input.discount_expression);

        return PriceCalculator.calculateHeader({
            subtotal: input.subtotal,
            exchangeRate: input.exchange_rate,
            discount: discount_amount,
            taxRate: input.tax_rate,
        });
    }
}
