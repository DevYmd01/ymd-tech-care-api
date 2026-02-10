import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePRLineDTO } from "../dto/create-pr-line.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreatePRLineRepository {
    constructor(private readonly prisma: PrismaService) { }

    async create(
        tx: Prisma.TransactionClient,
        dto: CreatePRLineDTO,
        pr_id: number,
    ) {
        return tx.pr_line.create({
            data: {
                pr_id: pr_id,
                line_no: dto.line_no ?? 0,
                item_id: dto.item_id ?? 0,
                description: dto.description ?? '',
                warehouse_id: dto.warehouse_id ?? 0,
                location: dto.location ?? '',
                qty: dto.qty ?? 0,
                uom_id: dto.uom_id ?? 0,
                est_unit_price: dto.est_unit_price ?? 0,
                tax_code: dto.tax_code ?? '',
                required_receipt_type: dto.required_receipt_type ?? '',
            },
        });
    }
}
