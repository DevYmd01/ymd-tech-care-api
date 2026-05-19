// src/common/inventory/inventory-policy/inventory-policy.types.ts

import {
  LotTransactionType,
} from '../lot-balance/enums/lot-balance-type.enum';

// ======================================================
// SINGLE POLICY
// ======================================================
export interface InventoryPolicy {
  affect_on_hand: boolean;
  affect_reserved: boolean;
  affect_available: boolean;

  on_hand_sign: number;
  reserved_sign: number;
  available_sign: number;

  require_stock_check: boolean;
}

// ======================================================
// POLICY MAP
// ======================================================
export type InventoryPolicyMap = Record<
  LotTransactionType,
  InventoryPolicy
>;