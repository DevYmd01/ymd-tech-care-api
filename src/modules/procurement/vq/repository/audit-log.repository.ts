import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class AuditLogRepository {
async create(tx: Prisma.TransactionClient, header: any, context: any) {

    const requesterUserId =
        header?.requester_user_id ??
        context?.user_id ??
        0;

    return tx.audit_log.create({
        data: {
            module_code: 'Procurement',
            document_type: 'VQ',

            document_id: BigInt(header.vq_header_id),
            document_no: header.vq_no,

            table_name: 'vq_header',
            record_id: BigInt(header.vq_header_id),

            action_type: 'CREATE',

            changed_by: BigInt(requesterUserId),

            request_id: context?.request_id ?? null,
            client_ip: context?.client_ip ?? null,
            user_agent: context?.user_agent ?? null,
        },
    });

}

    async update(tx: Prisma.TransactionClient, header: any, context: any) {
        return tx.audit_log.create({
            data: {
                module_code: 'Procurement',
                document_type: 'VQ',
                document_id: BigInt(header.vq_header_id),
                document_no: header.vq_no,
                table_name: 'vq_header',
                record_id: BigInt(header.vq_header_id),
                action_type: 'UPDATE',
                changed_by: BigInt(header.requester_user_id),
                request_id: context.request_id,
                client_ip: context.client_ip,
                user_agent: context.user_agent,
            },
        });
    }
}
