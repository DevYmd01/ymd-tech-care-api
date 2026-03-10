import { ConflictException, Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class UpdatePRLineRepository {

    async update(params: {
        tx: Prisma.TransactionClient;
        pr_line_id: number;
        lineData: Prisma.pr_lineUpdateInput;
    }) {

        const { tx, pr_line_id, lineData } = params;

        try {
            return await tx.pr_line.update({
                where: { pr_line_id },
                data: lineData,
            });
        } catch (error: any) {
            if (error.code === 'P2025') {
                throw new ConflictException('PR Line was modified by another user');
            }
            throw error;
        }
    }
}