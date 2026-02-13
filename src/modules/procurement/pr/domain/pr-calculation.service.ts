import { Injectable } from "@nestjs/common";
import { CreatePRLineDTO } from "../dto/create-pr-line.dto";
import { CreatePRHeaderDTO } from "../dto/creacte-pr-header.dto";
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class PrCalculationService {

    calculateTotals(prHeader: CreatePRHeaderDTO, lines: CreatePRLineDTO[]) {
        const total = lines.reduce(
            (sum, l) => sum + l.qty * l.est_unit_price,
            0
        );

        return {
            total_amount: total,
            base_amount: this.calculateBaseAmount(total, prHeader.pr_exchange_rate)
        };
    }

    calculateBaseAmount(
        total: number,
        exchangeRate: number,
    ) {
        return total * exchangeRate;
    }

    //หาค่า discount แบบ string
    parseDiscountRaw(input?: string) {
        if (!input) return { type: 'NONE' as const };

        const raw = input.trim();

        if (raw.endsWith('%')) {
            return {
                type: 'RATE' as const,
                rate: Number(raw.replace('%', '')) / 100,
            };
        }

        return {
            type: 'AMOUNT' as const,
            amount: Number(raw),
        };
    }

    //คำนวนเงิน line
    calculateLineAmount(input: {
        qty: number;
        unitPrice: number;
        discountInput?: string;
        taxRate: number;
    }) {
        // base = qty × unitPrice
        const base = new Decimal(input.qty)
            .times(input.unitPrice);

        // discount = discountAmount OR (discountRate × base)
        const discountParsed = this.parseDiscountRaw(
            input.discountInput,
        );

        let discount = new Decimal(0);

        if (discountParsed.type === 'RATE') {
            discount = base.times(discountParsed.rate);
        }

        if (discountParsed.type === 'AMOUNT') {
            discount = new Decimal(discountParsed.amount);
        }

        // net = base - discount
        const net = base.minus(discount);
        // tax = net × taxRate
        const tax = net.times(input.taxRate);
        // total = net + tax
        const total = net.plus(tax);

        return {
            // ค่า base
            base: base.toDecimalPlaces(4).toNumber(),
            // ค่า discount rate
            discount_rate:
                discountParsed.type === 'RATE'
                    ? discountParsed.rate
                    : base.gt(0)
                        ? discount.div(base).toNumber()
                        : 0,
            // ค่า discount amount
            discount_amount: discount.toDecimalPlaces(4).toNumber(),
            // ค่า net
            net: net.toDecimalPlaces(4).toNumber(),
            // ค่า tax
            tax: tax.toDecimalPlaces(4).toNumber(),
            // ค่า total
            total: total.toDecimalPlaces(4).toNumber(),
        };
    }

    //คำนวนเงิน header
    calculateHeaderTotals(input: {
        subtotal: number;
        discountInput?: string;
        taxRate: number;
    }) {
        const base = new Decimal(input.subtotal);

        const discountParsed = this.parseDiscountRaw(input.discountInput);

        let discount = new Decimal(0);

        if (discountParsed.type === 'RATE') {
            discount = base.times(discountParsed.rate);
        }

        if (discountParsed.type === 'AMOUNT') {
            discount = new Decimal(discountParsed.amount);
        }

        const taxable = base.minus(discount);
        const tax = taxable.times(input.taxRate);
        const total = taxable.plus(tax);

        return {
            //subtotal = qty × unitPrice
            subtotal: base.toDecimalPlaces(4).toNumber(),
            //discount = discountAmount OR (discountRate × base)
            discount_amount: discount.toDecimalPlaces(4).toNumber(),
            // net = base - discount
            net_total: taxable.toDecimalPlaces(4).toNumber(),
            // tax = net × taxRate
            tax_total: tax.toDecimalPlaces(4).toNumber(),
            // total = net + tax
            total: total.toDecimalPlaces(4).toNumber(),
        };
    }

    //แปลงค่าเป็น base
    convertToBase(lineBaseTotals: any, exchangeRate: number) {
        return {
            base_total: lineBaseTotals.subtotal * exchangeRate,
            discount_total: lineBaseTotals.discount_amount * exchangeRate,
            net_total: lineBaseTotals.net_total * exchangeRate,
            tax_total: lineBaseTotals.tax_total * exchangeRate,
            total: lineBaseTotals.total * exchangeRate,
        };
    }

}
