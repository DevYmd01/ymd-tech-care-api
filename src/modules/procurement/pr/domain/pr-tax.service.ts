import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../../../prisma/prisma.service";
import Decimal from "decimal.js";

@Injectable()
export class PrTaxService {
    constructor(private prisma: PrismaService) { }

    async getTaxById(taxCodeId: number) {
        const tax = await this.prisma.tax_code.findUnique({
            where: { tax_code_id: taxCodeId },
        });

        if (!tax) {
            throw new NotFoundException(
                `Invalid tax_code_id: ${taxCodeId}`
            );
        }

        return tax;
    }


    calculateTax(
        taxRate: number,
        amount: number,
    ) {
        return new Decimal(amount)
            .times(taxRate)
            .toDecimalPlaces(4);
    }

    calculateTaxAmount(
        taxRate: number,
        taxableAmount: number,
    ): number {
        return new Decimal(taxableAmount)
            .times(taxRate)
            .toDecimalPlaces(2, Decimal.ROUND_HALF_UP)
            .toNumber();
    }




}
