import { Prisma, PrismaClient } from "@prisma/client";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";

@Injectable()
export class UpdateSaleOrderLineRepository {
    constructor(private readonly prisma: PrismaService) {}

    async update(
        so_line_id: number,
        data: Prisma.sale_order_lineUpdateInput,
        tx?: Prisma.TransactionClient,
    ) {
        const client = tx ?? this.prisma;

        try {
            return await client.sale_order_line.update({
                where: { so_line_id },
                data,
            });
        } catch (error) {
            this.handlePrismaError(error, "UPDATE_SO_LINE", so_line_id);
        }
    }

    // 🔥 central error handler (NestJS style)
    private handlePrismaError(
        error: unknown,
        context: string,
        id?: number,
    ): never {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            if (error.code === "P2025") {
                throw new NotFoundException(
                    `[${context}] SaleOrderLine id=${id} not found`,
                );
            }
        }

        throw error;
    }
}