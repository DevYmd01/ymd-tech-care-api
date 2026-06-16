import { Prisma } from "@prisma/client";
import { CreateTransferOutHeaderDto } from "../dto/create-transfer-out-header.dto";

export class CreateTransferOutHeaderMapper {
    
  static toPrismaCreateInput(
    data: CreateTransferOutHeaderDto,
            transfer_out_no: string,
            stock_effect_ic: number | null,
            doc_type_no: number,
            doc_type_name: string,
  ): Prisma.transfer_out_headerCreateInput {
    return {
      transfer_out_no: transfer_out_no,
      
      appv_transfer_header: { connect: { appv_transfer_id: data.appv_transfer_id } },

      doc_link_ic: { connect: { doc_link_ic_id: data.doc_link_ic_id } },
    //   department: { connect: { emp_dept_id: data.emp_dept_id } },
    //   project: { connect: { project_id: data.project_id } },
      remarks: data.remarks,
      branch: { connect: { branch_id: data.branch_id } },
      created_by: { connect: { employee_id: data.created_by_emp_id } },
      status: data.status,
      stock_effect_ic: stock_effect_ic,
      doc_type_no: doc_type_no,
      doc_type_name: doc_type_name,
    };
  }

}