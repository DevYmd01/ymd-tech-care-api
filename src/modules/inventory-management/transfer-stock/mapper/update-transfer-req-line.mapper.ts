import { Prisma } from "@prisma/client";
import { UpdateTransferLineDto } from "../dto/update-transfer-req-line.dto";

export class UpdateTransferReqLineMapper {
    static toPrismaUpdateInput(
           data: UpdateTransferLineDto,
           transfer_req_id: number,
       ): Prisma.transfer_requisition_lineUpdateInput {
           return {
               transfer_req_header: { connect: { transfer_req_id: transfer_req_id } },

               item: { connect: { item_id: data.item_id } },
               qty: new Prisma.Decimal(data.qty),
               uom: { connect: { item_uom_id: data.uom_id } },

               from_warehouse: { connect: { warehouse_id: data.from_warehouse_id } },
               to_warehouse: { connect: { warehouse_id: data.to_warehouse_id } },
               from_location: { connect: { location_id: data.from_location_id } },
               to_location: { connect: { location_id: data.to_location_id } },
               lot: { connect: { lot_id: data.lot_id } },
               lot_balance: { connect: { lot_balance_id: data.lot_balance_id } },
   
                remarks:data.remarks,
           };
       }
}