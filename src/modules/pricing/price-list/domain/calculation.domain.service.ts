import { parseDiscountRaw } from '@/common/utils/discount.util';
import { Injectable } from '@nestjs/common';
import { PriceCalculator } from '@/common/calculators/price.calculator';

interface CalculateLineInput {
    unit_price: number;
    qty: number;
    discount_expression?: string;
}
export class DiscountDomainService {    
    calculateLineAmount(input: CalculateLineInput) {
            const discount_amount = parseDiscountRaw(input.discount_expression);
    
            return PriceCalculator.calculate({
                unitPrice: input.unit_price,
                quantity: input.qty,
                discount: discount_amount,
            });
        }
}   