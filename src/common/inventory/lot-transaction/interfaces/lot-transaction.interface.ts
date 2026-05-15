import { LotTransactionType } from '../enums/lot-balance-type.enum';

export interface LotTransactionInterface {
  lot_transaction_id?: number;

  item_id: number;

  branch_id?: number | null;

  warehouse_id: number;

  location_id: number;

  lot_id: number;

  qty: number;

  trans_type: LotTransactionType;

  ref_doc_type?: string | null;

  ref_doc_no?: string | null;

  ref_line_id?: number | null;

  remark?: string | null;

  created_at?: Date;
}

export interface LotPostingResultInterface {
  success: boolean;

  message?: string;

  lot_transaction_id?: number;

  item_id: number;

  warehouse_id: number;

  qty: number;

  trans_type: LotTransactionType;
}
