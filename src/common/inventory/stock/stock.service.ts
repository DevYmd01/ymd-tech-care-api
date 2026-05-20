// src/modules/inventory/stock/stock.service.ts

import { PolicyBuilder } from '../inventory-policy/policy-builder';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class StockService {

  /**
   * ENTRY POINT ของระบบ stock ทั้งหมด
   */
  async processTransaction(input: any) {


     const policy = PolicyBuilder.build(input);

  // STEP 2: validate
  this.validate(input, policy);

    // STEP 3: apply stock
  await this.applyStock(input, policy);

  console.log('DONE');

  console.log('VALID OK');


console.log('POLICY:', policy);

    return true;
  }
  

  private validate(input: any, policy: any) {

  // example 1: ISSUE ต้องมี stock พอ
  if (policy.transaction_type === 'OUT') {
    if (input.qty <= 0) {
      throw new Error('Qty invalid');
    }
  }

  // example 2: reserve logic
  if (policy.affect_reserved) {
    if (input.qty <= 0) {
      throw new Error('Reserve qty invalid');
    }
  }

  return true;
}

private async applyStock(input: any, policy: any) {

  const qty = input.qty ?? 0;

  // ==================================================
  // 1. หา balance ปัจจุบัน
  // ==================================================
  let balance = await prisma.item_lot_balance.findFirst({
    where: {
      item_id: input.item_id,
      lot_id: input.lot_id,
      warehouse_id: input.warehouse_id,
      location_id: input.location_id,
    },
  });

  // ถ้ายังไม่มี → create
  if (!balance) {
    balance = await prisma.item_lot_balance.create({
      data: {
        item_id: input.item_id,
        lot_id: input.lot_id,
        warehouse_id: input.warehouse_id,
        location_id: input.location_id,
        qty_on_hand: 0,
        qty_reserved: 0,
        qty_available: 0,
      },
    });
  }

  // ==================================================
  // 2. คำนวณใหม่
  // ==================================================
  const onHandChange = policy.on_hand_sign * qty;
  const reservedChange = policy.reserved_sign * qty;
  const availableChange = policy.available_sign * qty;

  const newOnHand =
    Number(balance.qty_on_hand) + onHandChange;

  const newReserved =
    Number(balance.qty_reserved) + reservedChange;

  const newAvailable =
    Number(balance.qty_available) + availableChange;

  // ==================================================
  // 3. update balance
  // ==================================================
  await prisma.item_lot_balance.update({
    where: {
      lot_balance_id: balance.lot_balance_id,
    },
    data: {
      qty_on_hand: newOnHand,
      qty_reserved: newReserved,
      qty_available: newAvailable,
    },
  });

  // ==================================================
  // 4. insert transaction log
  // ==================================================
  await prisma.lot_transaction.create({
    data: {
      lot_id: input.lot_id,
      item_id: input.item_id,
      warehouse_id: input.warehouse_id,
      location_id: input.location_id,
      qty: qty,
      trans_type: input.transaction_type,
      ref_doc_type: input.document_type,
      ref_doc_no: input.ref_doc_no ?? null,
      remarks: input.remarks ?? null,
    },
  });
}

}