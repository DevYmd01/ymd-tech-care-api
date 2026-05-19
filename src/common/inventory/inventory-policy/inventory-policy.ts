// src/common/inventory/inventory-policy/inventory-policy.ts

import {
  LotTransactionType,
} from '../lot-balance/enums/lot-balance-type.enum';

export const INVENTORY_POLICY = {
  // ======================================================
  // RECEIVE
  // ======================================================
  [LotTransactionType.RECEIVE]: {
    affect_on_hand: true,
    affect_reserved: false,
    affect_available: true,

    on_hand_sign: +1,
    reserved_sign: 0,
    available_sign: +1,

    require_stock_check: false,
  },

  // ======================================================
  // ISSUE
  // ======================================================
  [LotTransactionType.ISSUE]: {
    affect_on_hand: true,
    affect_reserved: false,
    affect_available: true,

    on_hand_sign: -1,
    reserved_sign: 0,
    available_sign: -1,

    require_stock_check: true,
  },

  // ======================================================
  // RESERVE
  // ======================================================
  [LotTransactionType.RESERVE]: {
    affect_on_hand: false,
    affect_reserved: true,
    affect_available: true,

    on_hand_sign: 0,
    reserved_sign: +1,
    available_sign: -1,

    require_stock_check: false,
  },

  // ======================================================
  // RELEASE
  // ======================================================
  [LotTransactionType.RELEASE]: {
    affect_on_hand: false,
    affect_reserved: true,
    affect_available: true,

    on_hand_sign: 0,
    reserved_sign: -1,
    available_sign: +1,

    require_stock_check: false,
  },

  // ======================================================
  // ADJUST
  // ======================================================
  [LotTransactionType.ADJUST]: {
    affect_on_hand: true,
    affect_reserved: false,
    affect_available: true,

    on_hand_sign: 1,
    reserved_sign: 0,
    available_sign: 1,

    require_stock_check: false,
  },

  // ======================================================
  // TRANSFER
  // ======================================================
  [LotTransactionType.TRANSFER]: {
    affect_on_hand: true,
    affect_reserved: false,
    affect_available: true,

    on_hand_sign: 1,
    reserved_sign: 0,
    available_sign: 1,

    require_stock_check: true,
  },
} as const;