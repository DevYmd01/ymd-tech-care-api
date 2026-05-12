import { StockTransactionType } from '../enums/stock-transaction-type.enum';

export interface StockTransactionInterface {
  stock_transaction_id?: number;

  item_id: number;

  branch_id?: number | null;

  warehouse_id: number;

  location_id?: number | null;

  qty: number;

  trans_type: StockTransactionType;

  ref_doc_type?: string | null;

  ref_doc_no?: string | null;

  ref_line_id?: number | null;

  remark?: string | null;

  created_at?: Date;
}

export interface StockPostingResultInterface {
  success: boolean;

  message?: string;

  transaction_id?: number;

  item_id: number;

  warehouse_id: number;

  qty: number;

  trans_type: StockTransactionType;
}

