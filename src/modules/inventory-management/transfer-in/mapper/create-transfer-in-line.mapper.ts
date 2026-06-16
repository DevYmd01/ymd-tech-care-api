import { Prisma } from "@prisma/client";
import { CreateTransferInLineDto } from "../dto/create-transfer-in-line.dto";

export class CreateTransferInLineMapper {
    
  static toPrismaCreateInput(
    data: CreateTransferInLineDto,
    transfer_in_id: number,
  ): Prisma.transfer_in_lineCreateInput {
    return {
      transfer_in_header: { connect: { transfer_in_id: transfer_in_id } },
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