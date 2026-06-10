import { Prisma } from "@prisma/client";
import { CreateIssueRequistionHeaderDto } from "../dto/create-issue-requistion-header.dto";

export class CreateIssueRequistionHeaderMapper {
    static toPrismaCreateInput(
        data: CreateIssueRequistionHeaderDto,
        issue_req_no: string,
        stock_effect_ic: number | null,
    ): Prisma.issue_requistion_headerCreateInput {
        return {
            issue_req_no: issue_req_no,
            issue_req_date: data.issue_req_date,
            doc_link_ic: { connect: { doc_link_ic_id: data.doc_link_ic_id } },
            department: { connect: { emp_dept_id: data.emp_dept_id } },
            project: { connect: { project_id: data.project_id } },
            remarks: data.remarks,
            org_branch: { connect: { branch_id: data.branch_id } },
            created_by: { connect: { employee_id: data.created_by_emp_id } },
            request_by: { connect: { employee_id: data.request_by_emp_id } },
            status: data.status,
            stock_effect_ic: stock_effect_ic,
            doc_type_no: data.doc_type_no,
        };
    }
}