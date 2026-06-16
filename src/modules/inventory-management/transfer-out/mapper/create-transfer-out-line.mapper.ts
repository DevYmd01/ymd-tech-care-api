import { Prisma } from "@prisma/client";
import { CreateTransferOutLineDto } from "../dto/create-transfer-out-line.dto";

export class CreateTransferOutLineMapper {
    
  static toPrismaCreateInput(
    data: CreateTransferOutLineDto,
    transfer_out_id: number,
  ): Prisma.transfer_out_lineCreateInput {
    return {
      transfer_out_header: { connect: { transfer_out_id: transfer_out_id } },
      appv_transfer_line: { connect: { appv_transfer_line_id: data.appv_transfer_line_id } },

      item: { connect: { item_id: data.item_id } },
      qty: new Prisma.Decimal(data.qty),
      uom: { connect: { item_uom_id: data.uom_id } },

      from_warehouse: { connect: { warehouse_id: data.from_warehouse_id } },
      to_warehouse: { connect: { warehouse_id: data.to_warehouse_id } },
      from_location: { connect: { location_id: data.from_location_id } },
      to_location: { connect: { location_id: data.to_location_id } },
      lot: { connect: { lot_id: data.lot_id } },
      lot_balance: { connect: { lot_balance_id: data.lot_balance_id } },
      remarks: data.remarks,
    };
  }

}