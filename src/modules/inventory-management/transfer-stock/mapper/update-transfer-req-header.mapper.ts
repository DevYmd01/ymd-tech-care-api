import { Prisma } from "@prisma/client";
import { UpdateTransferHeaderDto } from "../dto/update-transfer-req-header.dto";

export class UpdateTransferReqHeaderMapper {

    static toPrismaUpdateInput(
        data: UpdateTransferHeaderDto,
        stock_effect_ic: number | null,
        doc_type_no: number,
        doc_type_name: string,
    ): Prisma.transfer_requisition_headerUpdateInput {
        return {
            transfer_req_date: data.transfer_req_date,
            doc_link_ic: { connect: { doc_link_ic_id: data.doc_link_ic_id } },
            remarks: data.remarks,
            branch: { connect: { branch_id: data.branch_id } },
            created_by: { connect: { employee_id: data.created_by_emp_id } },
            transfer_by: { connect: { employee_id: data.transfer_by_emp_id } },
            status: data.status,
            stock_effect_ic: stock_effect_ic,
            doc_type_no: doc_type_no,
            doc_type_name: doc_type_name,
        };
    }

}