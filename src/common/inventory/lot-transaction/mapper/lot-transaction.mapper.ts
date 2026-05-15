import { LotTransactionInterface, LotPostingResultInterface } from '../interfaces/lot-transaction.interface';
import { LotTransactionType } from '../enums/lot-balance-type.enum';
import { Prisma, lot_transaction } from '@prisma/client';

export class LotTransactionMapper {
  
  // ======================================================
  // TO DB MODEL (CREATE)
  // ======================================================
  static toCreate(
    dto: LotTransactionInterface,
  ): Prisma.lot_transactionCreateInput {
    return {
      item: { connect: { item_id: dto.item_id } } ,
            ...(dto.branch_id != null && {
  branch: {
    connect: {
      branch_id: dto.branch_id,
    },
  },
}),
      warehouse: { connect: { warehouse_id: dto.warehouse_id } },
      location: { connect: { location_id: dto.location_id } }, 
    lot: { connect: { lot_id: dto.lot_id } },
      qty: new Prisma.Decimal(dto.qty),
      trans_type: dto.trans_type,
      ref_doc_type: dto.ref_doc_type ?? null,
      ref_doc_no: dto.ref_doc_no ?? null,
      ref_line_id: dto.ref_line_id ?? null,
      remarks: dto.remark ?? null,
    };
  }

  static toResponse(
  data: lot_transaction,
): LotTransactionInterface {
    return {
      lot_transaction_id: data.lot_transaction_id,

      item_id: data.item_id,

      branch_id: data.branch_id,

      warehouse_id: data.warehouse_id,

      location_id: data.location_id,

      lot_id: data.lot_id,

      qty: Number(data.qty),

      trans_type: data.trans_type as LotTransactionType ,

      ref_doc_type: data.ref_doc_type,

      ref_doc_no: data.ref_doc_no,

      ref_line_id: data.ref_line_id,

      remark: data.remarks ,

      created_at: data.created_at,
    };
  }

}