import { Prisma } from "@prisma/client";
import { UpdateTransferHeaderDto } from "../dto/update-transfer-req-header.dto";

export class UpdateTransferReqHeaderMapper {

    static toPrismaUpdateInput(
        data: UpdateTransferHeaderDto,
        stock_effect_ic?: number | null,
        doc_type_no?: number | null,
        doc_type_name?: string | null,
    ): Prisma.transfer_requisition_headerUpdateInput {
        return {
            ...(data.transfer_req_date && { transfer_req_date: data.transfer_req_date }),
            ...(data.doc_link_ic_id && { doc_link_ic: { connect: { doc_link_ic_id: data.doc_link_ic_id } } }),
            ...(data.remarks !== undefined && { remarks: data.remarks }),
            ...(data.branch_id && { branch: { connect: { branch_id: data.branch_id } } }),
            ...(data.created_by_emp_id && { created_by: { connect: { employee_id: data.created_by_emp_id } } }),
            ...(data.transfer_by_emp_id && { transfer_by: { connect: { employee_id: data.transfer_by_emp_id } } }),
            ...(data.status && { status: data.status }),
            ...(stock_effect_ic !== undefined && { stock_effect_ic }),
            ...(doc_type_no !== undefined && { doc_type_no }),
            ...(doc_type_name !== undefined && { doc_type_name }),
        };
    }
}