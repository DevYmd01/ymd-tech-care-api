import { CreateQcHeaderDTO } from "../dto/create-qc-header.dto";
import { Prisma } from "@prisma/client";

export class QCHeaderMapper {
    static toPrismaCreateInput(
        dto: CreateQcHeaderDTO,
        qc_no: string,
    ): Prisma.qc_headerCreateInput {
        return {
            qc_no: qc_no,
            pr: { connect: { pr_id: dto.pr_id } },
            rfq: { connect: { rfq_id: dto.rfq_id } },
            department: { connect: { emp_dept_id: dto.department_id } },
            status: 'DRAFT',
            remarks: dto.remarks,
            created_at: new Date(),
            createdQcHeaders: { connect: { employee_id: dto.created_by } },
            winningVq: { connect: { vq_header_id: dto.winning_vq_id } },
        }
    }
}

