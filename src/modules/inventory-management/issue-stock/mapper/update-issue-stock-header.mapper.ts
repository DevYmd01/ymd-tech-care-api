import { Prisma } from "@prisma/client";
import { UpdateIssueStockHeaderDto } from "../dto/update-issue-stock-header.dto";

export class UpdateIssueStockHeaderMapper {
    static toPrismaUpdateInput(
        data: UpdateIssueStockHeaderDto,
        stock_effect_ic: number | null,
        doc_type_no: number | null,
        doc_type_name: string | null
    ): Prisma.issue_stock_headerUpdateInput {
        return {
            ...(data.issue_stock_date && { issue_stock_date: data.issue_stock_date }),
            ...(data.branch_id && { org_branch: { connect: { branch_id: data.branch_id } } }),
            ...(data.appv_issue_req_id && { appv_issue_req_header: { connect: { appv_issue_req_id: data.appv_issue_req_id } } }),
            ...(data.created_by_emp_id && { created_by: { connect: { employee_id: data.created_by_emp_id } } }),
            ...(data.received_by_emp_id && { received_by: { connect: { employee_id: data.received_by_emp_id } } }),
            ...(data.doc_link_ic_id && { doc_link_ic: { connect: { doc_link_ic_id: data.doc_link_ic_id } } }),
            ...(data.emp_dept_id && { department: { connect: { emp_dept_id: data.emp_dept_id } } }),
            ...(data.project_id && { project: { connect: { project_id: data.project_id } } }),
            ...(data.remarks !== undefined && { remarks: data.remarks }),
            ...(data.status && { status: data.status }),
            ...(stock_effect_ic !== undefined && { stock_effect_ic }),
            ...(doc_type_no !== undefined && { doc_type_no }),
            ...(doc_type_name !== undefined && { doc_type_name }),
        };
    }
}