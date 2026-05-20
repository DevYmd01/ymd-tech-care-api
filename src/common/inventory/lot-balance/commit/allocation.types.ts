// allocation.types.ts

export interface AllocationLine {

  lot_id: number;

  item_lot_balance_id: number;

  qty: number;
}

export interface CommitPolicy {

  // ==================================================
  // DOCUMENT
  // ==================================================
  document_type: string;

  reference_no?: string;

  remarks?: string;

  // ==================================================
  // TRANSACTION
  // ==================================================
  transaction_type: string;

  // ==================================================
  // STOCK SIGNS
  // ==================================================
  on_hand_sign: number;

  reserved_sign: number;

  available_sign: number;
}