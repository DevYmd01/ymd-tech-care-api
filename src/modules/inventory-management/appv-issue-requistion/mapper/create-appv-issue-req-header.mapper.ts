import { Prisma } from "@prisma/client";
import { CreateApprovedIssueRequisitionHeaderDto } from "../dto/create-appv-issue-req-header.dto";

export class CreateAppvIssueReqHeaderMapper {
    static toPrismaCreateInput(
        data: CreateApprovedIssueRequisitionHeaderDto,
        issue_req_no: string,
        stock_effect_ic: number | null,
    ): Prisma.appvissue_requistion_headerCreateInput {
        return {

            appv_issue_req_no: issue_req_no,
            appv_issue_req_date: data.appv_issue_req_date,
            issue_req_header: { connect: { issue_req_id: data.issue_req_id } },
            doc_link_ic: { connect: { doc_link_ic_id: data.doc_link_ic_id } },
            department: { connect: { emp_dept_id: data.emp_dept_id } },
            project: { connect: { project_id: data.project_id } },
            remarks: data.remarks,
            org_branch: { connect: { branch_id: data.branch_id } },
            approval_emp: { connect: { employee_id: data.approval_emp_id } },
            status: data.status,
            stock_effect_ic: stock_effect_ic,
            doc_type_no: data.doc_type_no,
        };
    }
}