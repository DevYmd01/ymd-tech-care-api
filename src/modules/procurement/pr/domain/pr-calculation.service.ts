import { Injectable } from "@nestjs/common";
import { CreatePRLineDTO } from "../dto/create-pr-line.dto";
import { CreatePRHeaderDTO } from "../dto/creacte-pr-header.dto";

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

}
