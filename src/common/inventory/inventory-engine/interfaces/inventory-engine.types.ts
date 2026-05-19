import {
  LotTransactionType,
  LotRefDocType,
} from '../../lot-balance/enums/lot-balance-type.enum';

export interface InventoryMovementInput {
  item_id: number;

  warehouse_id: number;
  location_id: number;
  branch_id: number;

  lot_id: number;

  qty: number;

  trans_type: LotTransactionType;
  ref_doc_type?: LotRefDocType;

  ref_doc_no?: string;
  ref_line_id?: number;

  remarks?: string;
}