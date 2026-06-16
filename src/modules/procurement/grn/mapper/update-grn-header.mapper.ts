import { Prisma } from "@prisma/client";
import { UpdateGrnHeaderDto } from "../dto/update-grn-header.dto";

export class UpdateGrnHeaderMapper {
    static toPrismaUpdateInput(
        data: UpdateGrnHeaderDto,
    ): Prisma.grn_headerUpdateInput {
        return {
            grn_date: data.grn_date,
            po_approval: { connect: { approval_id: data.po_approval_id } },
            status: data.status,
            received_dy: { connect: { employee_id: data.received_by_id } },
            created_by: { connect: { employee_id: data.created_by_id } },
            project: { connect: { project_id: data.project_id } },
            department: { connect: { emp_dept_id: data.emp_dept_id } },
            branch: { connect: { branch_id: data.branch_id } },
            remarks: data.remarks,    
        }
    }

}
