import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreatePRHeaderDTO } from '../dto/creacte-pr-header.dto';

@Injectable()
export class PRHeaderRepository {
    async create(
        tx: Prisma.TransactionClient,
        dto: CreatePRHeaderDTO,
    ) {
        return tx.pr_header.create({
            data: {
                pr_no: dto.pr_no,
                pr_date: dto.pr_date ? new Date(dto.pr_date) : new Date(),

                branch_id: dto.branch_id,
                need_by_date: dto.need_by_date ? new Date(dto.need_by_date) : new Date(),

                status: dto.status,
                currency_code: dto.currency_code,
                exchange_rate: dto.exchange_rate,
                remark: dto.remark ?? null,
                payment_term_days: dto.payment_term_days,

                created_at: new Date(),
                updated_at: new Date(),
                total_est_amount: dto.total_amount,
                requester_user_id: dto.requester_user_id,
            },
        });
    }
}
