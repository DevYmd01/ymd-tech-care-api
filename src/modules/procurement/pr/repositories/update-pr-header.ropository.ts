import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { ConflictException } from "@nestjs/common";

@Injectable()
export class UpdatePRHeaderRepository {

    async update(params: {
        tx: Prisma.TransactionClient;
        pr_id: number;
        version: number;
        headerData: Prisma.pr_headerUpdateInput;
    }) {

        const { tx, pr_id, version, headerData } = params;

        try {
            return await tx.pr_header.update({
                where: { pr_id, version },
                data: headerData,
            });

        } catch (error: any) {

            if (error.code === 'P2025') {
                throw new ConflictException('PR was modified by another user');
            }

            throw error;
        }
    }

}
