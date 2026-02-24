import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/prisma/prisma.service";
import { getChangedFields } from "./utils/get-changed-fields";

@Injectable()
export class AuditService {

    constructor(private prisma: PrismaService) { }

    async logChanges(tx, params: {

        module: string;
        documentType: string;
        documentId: bigint;
        documentNo?: string;

        tableName: string;
        recordId: bigint;

        oldData?: any;
        newData?: any;

        actionType: 'CREATE' | 'UPDATE' | 'DELETE';

        userId: bigint;
        requestId: bigint;
        clientIp: string;
        userAgent: string;

    }) {

        // 🔹 create log header
        const audit = await tx.audit_log.create({
            data: {
                module_code: params.module,
                document_type: params.documentType,
                document_id: params.documentId,
                document_no: params.documentNo,

                table_name: params.tableName,
                record_id: params.recordId,

                action_type: params.actionType,
                changed_by: params.userId,
                request_id: params.requestId,
                client_ip: params.clientIp,
                user_agent: params.userAgent,

                old_value: params.oldData ? JSON.stringify(params.oldData) : null,
                new_value: params.newData ? JSON.stringify(params.newData) : null,
            }
        });

    }

}
