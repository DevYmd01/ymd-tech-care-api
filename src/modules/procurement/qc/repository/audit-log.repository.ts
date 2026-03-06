import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class AuditLogRepository {
    async create(tx: Prisma.TransactionClient, header: any, context: any) {
        return tx.audit_log.create({
            data: {
                module_code: 'QC',
                document_type: 'QC',
                document_id: BigInt(header.qc_header_id),
                document_no: header.qc_no,

                table_name: 'qc_header',
                record_id: BigInt(header.qc_header_id),

                action_type: 'CREATE',
                changed_by: BigInt(header.requester_user_id),

                request_id: context.request_id,
                client_ip: context.client_ip,
                user_agent: context.user_agent,
            },
        });
    }

    async update(tx: Prisma.TransactionClient, header: any, context: any) {
        return tx.audit_log.create({
            data: {
                module_code: 'QC',
                document_type: 'QC',
                document_id: BigInt(header.qc_header_id),
                document_no: header.qc_no,
                table_name: 'qc_header',
                record_id: BigInt(header.qc_header_id),
                action_type: 'UPDATE',
                changed_by: BigInt(header.requester_user_id),
                request_id: context.request_id,
                client_ip: context.client_ip,
                user_agent: context.user_agent,
            },
        });
    }
}
