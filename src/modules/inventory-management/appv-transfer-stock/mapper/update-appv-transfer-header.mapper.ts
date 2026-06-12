import { Prisma } from "@prisma/client";
import { UpdateAppvTransferHeaderDto } from "../dto/update-appv-transfer-header.dto";

export class UpdateAppvTransferHeaderMapper {

    static toPrismaUpdateInput(
        data: UpdateAppvTransferHeaderDto,
        stock_effect_ic?: number | null,
        doc_type_no?: number | null,
        doc_type_name?: string | null,
    ): Prisma.appv_transfer_headerUpdateInput {
        return {
            ...(data.appv_transfer_date && { appv_transfer_date: data.appv_transfer_date }),
            ...(data.transfer_req_id && { transfer_req_header: { connect: { transfer_req_id: data.transfer_req_id } } }),
            ...(data.doc_link_ic_id && { doc_link_ic: { connect: { doc_link_ic_id: data.doc_link_ic_id } } }),
            ...(data.remarks !== undefined && { remarks: data.remarks }),
            ...(data.branch_id && { branch: { connect: { branch_id: data.branch_id } } }),
            ...(data.approval_emp_id && { approval_emp: { connect: { employee_id: data.approval_emp_id } } }),
            ...(data.status && { status: data.status }),
            ...(stock_effect_ic !== undefined && { stock_effect_ic }),
            ...(doc_type_no !== undefined && { doc_type_no }),
            ...(doc_type_name !== undefined && { doc_type_name }),
        };
    }

}