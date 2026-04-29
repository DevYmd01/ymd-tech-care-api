import { Prisma } from '@prisma/client';
import { UpdateItemLotBalanceDto } from '../dto/update-item-lot-balance.dto';

export class UpdateItemLotBalanceMapper {
  static toPrismaUpdateInput(
    dto: UpdateItemLotBalanceDto,
  ): Prisma.item_lot_balanceUpdateInput {
    return {
      lot: {
        connect: {
          lot_id: dto.lot_id,
        },
      },

      item: {
        connect: {
          item_id: dto.item_id,
        },
      },

      branch: dto.branch_id
        ? {
            connect: {
              branch_id: dto.branch_id,
            } ,
          }
        : undefined,

        warehouse: 
        {
            connect: {
              warehouse_id: dto.warehouse_id,
            } ,
          }
        ,

        location: 
        {
            connect: {
              location_id: dto.location_id,
            }            
            }
        ,
qty_on_hand: dto.qty_on_hand,
qty_reserved: dto.qty_reserved,
qty_available: dto.qty_available

    };
  }
}
