import { Prisma } from "@prisma/client";
import { CreateAppvTransferHeaderDto } from "../dto/create-appv-transfer-header.dto";

export class CreateAppvTransferHeaderMapper {

    static toPrismaCreateInput(
        data: CreateAppvTransferHeaderDto,
        appv_transfer_no: string,
        stock_effect_ic: number | null,
        doc_type_no: number,
        doc_type_name: string,
    ): Prisma.appv_transfer_headerCreateInput {
        return {
            appv_transfer_no: appv_transfer_no,
            appv_transfer_date: data.appv_transfer_date,
            transfer_req_header: { connect: { transfer_req_id: data.transfer_req_id } },

            doc_link_ic: { connect: { doc_link_ic_id: data.doc_link_ic_id } },
            remarks: data.remarks,
            branch: { connect: { branch_id: data.branch_id } },
            approval_emp: { connect: { employee_id: data.approval_emp_id } },
            status: data.status,
            stock_effect_ic: stock_effect_ic,
            doc_type_no: doc_type_no,
            doc_type_name: doc_type_name,
        };
    }

}