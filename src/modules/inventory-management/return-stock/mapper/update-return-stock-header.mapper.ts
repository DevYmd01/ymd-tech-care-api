import { Prisma } from "@prisma/client";
import { CreateReturnStockHeaderDto } from "../dto/create-return-stock-header.dto";

export class CreateReturnStockHeaderMapper {
    static toPrismaCreateInput(
        data: CreateReturnStockHeaderDto,
        return_stock_no: string,
        stock_effect_ic: number | null,
        doc_type_no: number,
        doc_type_name: string,
    ): Prisma.return_issue_stock_headerCreateInput {
        return {
            return_stock_no: return_stock_no,
            return_stock_date: data.return_stock_date,
            issue_stock_header: { connect: { issue_stock_id: data.issue_stock_id } },
            doc_link_ic: { connect: { doc_link_ic_id: data.doc_link_ic_id } },
            department: { connect: { emp_dept_id: data.emp_dept_id } },
            project: { connect: { project_id: data.project_id } },
            remarks: data.remarks,
            org_branch: { connect: { branch_id: data.branch_id } },
            created_by: { connect: { employee_id: data.created_by_emp_id } },
            received_by: { connect: { employee_id: data.received_by_emp_id } },
            status: data.status,
            stock_effect_ic: stock_effect_ic,
            doc_type_no: doc_type_no,
            doc_type_name: doc_type_name,
        };
    }
}