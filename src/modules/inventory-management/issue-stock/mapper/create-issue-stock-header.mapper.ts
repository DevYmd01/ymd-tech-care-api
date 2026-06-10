import { Prisma } from "@prisma/client";
import { CreateIssueStockHeaderDto } from "../dto/create-issue-stock-header.dto";

export class CreateIssueStockHeaderMapper {
    static toPrismaCreateInput(
        data: CreateIssueStockHeaderDto,
        issue_stock_no: string,
        stock_effect_ic: number | null,
        doc_type_no: number,
        doc_type_name: string
    ): Prisma.issue_stock_headerCreateInput {
        return {
            issue_stock_no: issue_stock_no,
            issue_stock_date: data.issue_stock_date,
            org_branch: { connect: { branch_id: data.branch_id } },
            appv_issue_req_header: { connect: { appv_issue_req_id: data.appv_issue_req_id } },
            created_by: { connect: { employee_id: data.created_by_emp_id } },
            received_by: { connect: { employee_id: data.received_by_emp_id } },
            doc_link_ic: { connect: { doc_link_ic_id: data.doc_link_ic_id } },
            department: { connect: { emp_dept_id: data.emp_dept_id } },
            project: { connect: { project_id: data.project_id } },
            remarks: data.remarks,
            status: data.status,
            stock_effect_ic: stock_effect_ic,
            doc_type_no: doc_type_no,
            doc_type_name: doc_type_name,
        };
    }


    }