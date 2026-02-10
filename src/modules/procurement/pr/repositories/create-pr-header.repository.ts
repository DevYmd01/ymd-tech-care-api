import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreatePRHeaderDTO } from '../dto/creacte-pr-header.dto';

@Injectable()
export class PRHeaderRepository {
    async create(
        tx: Prisma.TransactionClient,
        dto: CreatePRHeaderDTO,
        document_no: string,
    ) {
        return tx.pr_header.create({
            data: {
                pr_no: document_no,
                pr_date: dto.pr_date ? new Date(dto.pr_date) : new Date(),

                branch_id: dto.branch_id,
                need_by_date: dto.need_by_date ? new Date(dto.need_by_date) : new Date(),

                status: dto.status,
                currency_id: dto.currency_id,
                pr_exchange_rate: dto.pr_exchange_rate ?? null,
                pr_base_currency: dto.pr_base_currency ?? null,
                pr_quote_currency: dto.pr_quote_currency ?? null,
                pr_exchange_rate_date: dto.pr_exchange_rate_date ? new Date(dto.pr_exchange_rate_date) : new Date(),
                remark: dto.remark ?? null,
                payment_term_days: dto.payment_term_days ?? null,

                created_at: new Date(),
                updated_at: new Date(),
                total_est_amount: dto.total_amount,
                requester_user_id: dto.requester_user_id,

                delivery_date: dto.delivery_date ? new Date(dto.delivery_date) : new Date(),
                credit_days: dto.credit_days,
                vendor_quote_no: dto.vendor_quote_no,
                shipping_method: dto.shipping_method,
                requester_name: dto.requester_name,
            },
        });
    }
}
