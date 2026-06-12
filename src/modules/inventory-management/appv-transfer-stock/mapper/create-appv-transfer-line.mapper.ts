import { Prisma } from "@prisma/client";
import { CreateAppvTransferLineDto } from "../dto/create-appv-transfer-line.dto";

export class CreateAppvTransferLineMapper {
    static toPrismaCreateInput(
           data: CreateAppvTransferLineDto,
           appv_transfer_id: number,
       ): Prisma.appv_transfer_lineCreateInput {
           return {
               appv_transfer_header: { connect: { appv_transfer_id: appv_transfer_id } },
                transfer_req_line: { connect: { transfer_req_line_id: data.transfer_req_line_id } },

               item: { connect: { item_id: data.item_id } },
               qty: new Prisma.Decimal(data.qty),
               qty_approved: new Prisma.Decimal(data.qty_approved),
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