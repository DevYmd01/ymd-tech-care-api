import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ShowWaitingForRFQRepository {

    constructor(private prisma: PrismaService) { }

    async findWaitingForRFQ(
        skip = 0,
        take = 20,
        where: Prisma.pr_headerWhereInput,
    ) {

        const [data, total] = await Promise.all([
            this.prisma.pr_header.findMany({
                where,
                skip,
                take,
                orderBy: { pr_id: 'desc' },
                select: {
                    pr_id: true,
                    pr_no: true,
                    pr_date: true,
                    need_by_date: true,
                    pr_base_total_amount: true,
                    remark: true,
                    status: true,
                    branch: {
                        select: {
                            branch_id: true,
                            branch_code: true,
                            branch_name: true
                        }
                    },
                    pr_tax_code: {
                        select: {
                            tax_code_id: true,
                            tax_code: true,
                            tax_name: true
                        }
                    },
                    requester_user: {
                        select: {
                            employee_id: true,
                            employee_code: true,
                            employee_firstname_th: true,
                            employee_lastname_th: true,
                            department: {
                                select: {
                                    department_id: true,
                                    department_code: true,
                                    department_name: true
                                }
                            }
                        }
                    },
                },
            }),
            this.prisma.pr_header.count({ where }),
        ]);

        return { data, total };
    }
}
