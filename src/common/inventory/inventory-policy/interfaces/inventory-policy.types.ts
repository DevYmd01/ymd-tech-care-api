// inventory-policy.types.ts

/**
 * ======================================================
 * STOCK DIRECTION
 * ======================================================
 */
export type StockDirection =
  | -1
  | 0
  | 1;

/**
 * ======================================================
 * STOCK EFFECT TYPE
 *
 * 0 = NONE
 * 1 = IN
 * 2 = OUT
 * ======================================================
 */
export type StockEffectType =
  | 0
  | 1
  | 2;

/**
 * ======================================================
 * INVENTORY POLICY
 * ======================================================
 */
export interface InventoryPolicy {

  // ==================================================
  // DOCUMENT
  // ==================================================
  system_document_id: number;

  document_type_no: number;

  document_type_name?: string;

  document_description?: string;

  transaction_type: string;

  // ==================================================
  // STOCK EFFECT
  // ==================================================
  stock_effect_ic: StockEffectType;

  affect_on_hand: boolean;

  affect_reserved: boolean;

  affect_available: boolean;

  affect_in_transit: boolean;

  // ==================================================
  // SIGNS
  // ==================================================
  on_hand_sign: number;

  reserved_sign: number;

  available_sign: number;

  // ==================================================
  // DIRECTION
  // ==================================================
  qty_direction: StockDirection;

  reserved_direction: StockDirection;

  // ==================================================
  // LOT
  // ==================================================
  require_lot: boolean;

  allow_create_lot: boolean;

  consume_fifo: boolean;

  consume_fefo: boolean;

  // ==================================================
  // APPROVAL
  // ==================================================
  require_approval: boolean;

  // ==================================================
  // VALIDATION
  // ==================================================
  allow_negative_stock: boolean;

  validate_stock: boolean;

  validate_expire: boolean;

  // ==================================================
  // TRANSACTION
  // ==================================================
  create_transaction: boolean;

  update_balance: boolean;

  // ==================================================
  // COST
  // ==================================================
  require_cost: boolean;

  update_cost: boolean;

  // ==================================================
  // STATUS
  // ==================================================
  is_active: boolean;
}

/**
 * ======================================================
 * POLICY CONFIG
 * ======================================================
 */
export interface InventoryPolicyConfig {

  // ==================================================
  // DOC LINK IC
  // ==================================================
  system_document_id: number;

  document_type_no: number;

  document_type_name?: string;

  document_description?: string;

  // ==================================================
  // TRANSACTION
  // ==================================================
  transaction_type: string;

  // ==================================================
  // STOCK EFFECT
  //
  // 0 = NONE
  // 1 = IN
  // 2 = OUT
  // ==================================================
  stock_effect_ic: StockEffectType;

  // ==================================================
  // RESERVED
  // ==================================================
  affect_reserved?: boolean;

  reserved_direction?: StockDirection;

  // ==================================================
  // AVAILABLE
  // ==================================================
  affect_available?: boolean;

  affect_in_transit?: boolean;

  // ==================================================
  // LOT
  // ==================================================
  require_lot?: boolean;

  allow_create_lot?: boolean;

  consume_fifo?: boolean;

  consume_fefo?: boolean;

  // ==================================================
  // APPROVAL
  // ==================================================
  require_approval?: boolean;

  // ==================================================
  // VALIDATION
  // ==================================================
  allow_negative_stock?: boolean;

  validate_stock?: boolean;

  validate_expire?: boolean;

  // ==================================================
  // TRANSACTION
  // ==================================================
  create_transaction?: boolean;

  update_balance?: boolean;

  // ==================================================
  // COST
  // ==================================================
  require_cost?: boolean;

  update_cost?: boolean;

  // ==================================================
  // STATUS
  // ==================================================
  is_active?: boolean;
}