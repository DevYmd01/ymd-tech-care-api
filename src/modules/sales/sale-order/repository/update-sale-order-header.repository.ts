import { Prisma, PrismaClient } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service"; // Import PrismaService

@Injectable()
export class UpdateSaleOrderHeaderRepository {
    constructor(private readonly prisma: PrismaService) {} // Change type to PrismaService

    async update(
        so_id: number,
        data: Prisma.sale_order_headerUpdateInput,
        tx?: Prisma.TransactionClient,
    ) {
        const client = tx ?? this.prisma;

        try {
            return await client.sale_order_header.update({
                where: { so_id },
                data,
            });
        } catch (error) {
            this.handlePrismaError(error, "UPDATE_SO_HEADER");
        }
    }

    // 🔥 แนะนำให้มี error handler กลาง
    private handlePrismaError(error: any, context: string): never {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
            // P2025 = record not found
            if (error.code === "P2025") {
                throw new Error(`[${context}] SaleOrder not found`);
            }
        }

        throw error;
    }
}