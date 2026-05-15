// src/common/inventory/lot-balance/lot-balance.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LotBalanceService {
  constructor(private readonly prisma: PrismaService) {}

  // ======================================================
  // FIND ONE LOT BALANCE
  // ======================================================
  async findOne(
    data: { lot_id: number; warehouse_id: number; location_id: number },
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? this.prisma;

    const lotBalance = await client.item_lot_balance.findUnique({
      where: {
        lot_id_warehouse_id_location_id: {
          lot_id: data.lot_id,
          warehouse_id: data.warehouse_id,
          location_id: data.location_id,
        },
      },
    });

    if (!lotBalance) {
      throw new BadRequestException(
        `Lot balance not found: lot_id=${data.lot_id}, warehouse_id=${data.warehouse_id}, location_id=${data.location_id}`,
      );
    }

    return lotBalance;
  }

  // ======================================================
  // ADJUST LOT BALANCE (ADD/DEDUCT STOCK)
  // ======================================================
  async adjust(
    data: {
      lot_id: number;
      item_id: number;
      warehouse_id: number;
      location_id: number;
      branch_id: number;
      qty: number; // (+ ADD, - DEDUCT)
    },
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? this.prisma;

    if (data.qty === 0) {
      throw new BadRequestException('Quantity cannot be 0');
    }

    if (data.qty < 0) {
      // ถ้าหักลบต้องตรวจสอบว่าคงเหลือเพียงพอหรือไม่
      const balance = await this.findOne(
        {
          lot_id: data.lot_id,
          warehouse_id: data.warehouse_id,
          location_id: data.location_id,
        },
        client,
      );

      if (!balance || Number(balance.qty_on_hand) + data.qty < 0) {
        throw new BadRequestException('Insufficient stock for adjustment');
      }
    }

    return client.item_lot_balance.upsert({
      where: {
        lot_id_warehouse_id_location_id: {
          lot_id: data.lot_id,
          warehouse_id: data.warehouse_id,
          location_id: data.location_id,
        },
      },
      create: {
        lot_id: data.lot_id,
        item_id: data.item_id,
        branch_id: data.branch_id,
        warehouse_id: data.warehouse_id,
        location_id: data.location_id,
        qty_on_hand: Math.max(0, data.qty),
        qty_reserved: 0,
        qty_available: Math.max(0, data.qty),
      },
      update: {
        qty_on_hand: { increment: data.qty },
        qty_available: { increment: data.qty },
      },
    });
  }

  // ======================================================
  // RESERVE STOCK
  // ======================================================
  async reserve(
    data: { lot_id: number; warehouse_id: number; location_id: number; qty: number },
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? this.prisma;

    const lotBalance = await this.findOne(
      {
        lot_id: data.lot_id,
        warehouse_id: data.warehouse_id,
        location_id: data.location_id,
      },
      client,
    );

    if (Number(lotBalance.qty_available) < data.qty) {
      throw new BadRequestException('Insufficient available stock for reservation');
    }

    return client.item_lot_balance.update({
      where: {
        lot_id_warehouse_id_location_id: {
          lot_id: data.lot_id,
          warehouse_id: data.warehouse_id,
          location_id: data.location_id,
        },
      },
      data: {
        qty_reserved: { increment: data.qty },
        qty_available: { decrement: data.qty },
      },
    });
  }

  // ======================================================
  // RELEASE RESERVED STOCK
  // ======================================================
  async release(
    data: { lot_id: number; warehouse_id: number; location_id: number; qty: number },
    tx?: Prisma.TransactionClient,
  ) {
    const client = tx ?? this.prisma;

    const lotBalance = await this.findOne(
      {
        lot_id: data.lot_id,
        warehouse_id: data.warehouse_id,
        location_id: data.location_id,
      },
      client,
    );

    if (Number(lotBalance.qty_reserved) < data.qty) {
      throw new BadRequestException('Cannot release stock beyond reserved quantity');
    }

    return client.item_lot_balance.update({
      where: {
        lot_id_warehouse_id_location_id: {
          lot_id: data.lot_id,
          warehouse_id: data.warehouse_id,
          location_id: data.location_id,
        },
      },
      data: {
        qty_reserved: { decrement: data.qty },
        qty_available: { increment: data.qty },
      },
    });
  }
}