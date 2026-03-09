import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class AuditLogRepository {
    async create(tx: Prisma.TransactionClient, header: any, context: any) {
        return tx.audit_log.create({
            data: {
                module_code: 'Procurement',
                document_type: 'PO',
                document_id: BigInt(header.po_header_id),
                document_no: header.po_no,

                table_name: 'po_header',
                record_id: BigInt(header.po_header_id),

                action_type: 'CREATE',
                changed_by: BigInt(header.created_by),

                request_id: context.request_id,
                client_ip: context.client_ip,
                user_agent: context.user_agent,
            },
        });
    }

    async update(tx: Prisma.TransactionClient, header: any, context: any) {
        return tx.audit_log.create({
            data: {
                module_code: 'Procurement',
                document_type: 'PO',
                document_id: BigInt(header.po_header_id),
                document_no: header.po_no,
                table_name: 'po_header',
                record_id: BigInt(header.po_header_id),
                action_type: 'UPDATE',
                changed_by: BigInt(header.requester_user_id),
                request_id: context.request_id,
                client_ip: context.client_ip,
                user_agent: context.user_agent,
            },
        });
    }
}
