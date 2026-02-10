import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class CreateAuditLogRepository {
    async create(tx: Prisma.TransactionClient, header: any, context: any) {
        return tx.audit_log.create({
            data: {
                module_code: 'PR',
                document_type: 'PR',
                document_id: BigInt(header.pr_id),
                document_no: header.pr_no,

                table_name: 'pr_header',
                record_id: BigInt(header.pr_id),

                action_type: 'CREATE',
                changed_by: BigInt(header.requester_user_id),

                request_id: context.request_id,
                client_ip: context.client_ip,
                user_agent: context.user_agent,
            },
        });
    }
}
