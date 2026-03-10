import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class ShowAllPRHeaderRepository {

    constructor(private prisma: PrismaService) { }

    async findAll(skip: number, take: number) {

        const [data, total] = await Promise.all([
            this.prisma.pr_header.findMany({
                skip,
                take,
                orderBy: { pr_date: 'desc' },
                select: {
                    pr_id: true,
                    pr_no: true,
                    branch_id: true,
                    requester_user_id: true,
                    requester_name: true,
                    pr_date: true,
                    need_by_date: true,
                    project_id: true,
                    status: true,
                    pr_base_currency_code: true,
                    pr_quote_currency_code: true,
                    pr_exchange_rate: true,
                    pr_exchange_rate_date: true,
                    pr_discount_raw: true,
                    pr_base_total_amount: true,
                    created_at: true,
                    updated_at: true,
                    credit_days: true,
                    payment_term_days: true,
                    vendor_quote_no: true,
                    shipping_method: true,
                    remark: true,
                    preferred_vendor_id: true,
                    pr_tax_code_id: true,
                    pr_tax_rate: true,
                },
            }),
            this.prisma.pr_header.count(),
        ]);

        return { data, total };
    }
}
