import {
  Injectable,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@prisma/client';

import { CreateItemLotBalanceDto } from './dto/create-item-lot-balance.dto';
import { UpdateItemLotBalanceDto } from './dto/update-item-lot-balance.dto';

import { CreateItemLotBalanceRepository } from './repository/create-item-lot-balance.repository';
import { UpdateItemLotBalanceRepository } from './repository/update-item-lot-balance.repository';

import { CreateItemLotBalanceMapper } from './mapper/create-item-lot-balance.mapper';
import { UpdateItemLotBalanceMapper } from './mapper/update-item-lot-balance.mapper';

@Injectable()
export class ItemLotBalanceService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly createItemLotBalanceRepository: CreateItemLotBalanceRepository,
    private readonly updateItemLotBalanceRepository: UpdateItemLotBalanceRepository,
  ) {}

  // ==================================================
  // CREATE
  // ใช้สร้าง record lot balance ครั้งแรก
  // ==================================================
  async create(data: CreateItemLotBalanceDto) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const payload =
          CreateItemLotBalanceMapper.toPrismaCreateInput(data);

        return await this.createItemLotBalanceRepository.create(
          tx,
          payload,
        );
      });
    } catch (error: any) {
      this.handlePrismaError(error);
    }
  }

  // ==================================================
  // UPDATE
  // ==================================================
  async update(
    lot_balance_id: number,
    data: UpdateItemLotBalanceDto,
  ) {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const oldData =
          await tx.item_lot_balance.findUnique({
            where: { lot_balance_id },
          });

        if (!oldData) {
          throw new NotFoundException(
            'ไม่พบข้อมูล Item Lot Balance',
          );
        }

        const payload =
          UpdateItemLotBalanceMapper.toPrismaUpdateInput(
            data,
          );

        return await this.updateItemLotBalanceRepository.update(
          tx,
          lot_balance_id,
          payload,
        );
      });
    } catch (error: any) {
      this.handlePrismaError(error);
    }
  }

  // ==================================================
  // RECEIVE STOCK
  // รับสินค้าเข้า lot
  // ==================================================
  async receive(
    lot_balance_id: number,
    qty: number,
  ) {
    if (qty <= 0) {
      throw new BadRequestException(
        'จำนวนรับเข้าต้องมากกว่า 0',
      );
    }

    return await this.prisma.$transaction(async (tx) => {
      const row =
        await tx.item_lot_balance.findUnique({
          where: { lot_balance_id },
        });

      if (!row) {
        throw new NotFoundException(
          'ไม่พบข้อมูล lot balance',
        );
      }

      const newOnHand =
        Number(row.qty_on_hand) + qty;

      const newAvailable =
        newOnHand - Number(row.qty_reserved);

      return await tx.item_lot_balance.update({
        where: { lot_balance_id },
        data: {
          qty_on_hand: new Prisma.Decimal(newOnHand),
          qty_available:
            new Prisma.Decimal(newAvailable),
        },
      });
    });
  }

  // ==================================================
  // ISSUE STOCK
  // เบิกสินค้าออก
  // ==================================================
  async issue(
    lot_balance_id: number,
    qty: number,
  ) {
    if (qty <= 0) {
      throw new BadRequestException(
        'จำนวนเบิกต้องมากกว่า 0',
      );
    }

    return await this.prisma.$transaction(async (tx) => {
      const row =
        await tx.item_lot_balance.findUnique({
          where: { lot_balance_id },
        });

      if (!row) {
        throw new NotFoundException(
          'ไม่พบข้อมูล lot balance',
        );
      }

      const available =
        Number(row.qty_available);

      if (qty > available) {
        throw new BadRequestException(
          'จำนวนคงเหลือไม่พอ',
        );
      }

      const newOnHand =
        Number(row.qty_on_hand) - qty;

      const newAvailable =
        newOnHand - Number(row.qty_reserved);

      return await tx.item_lot_balance.update({
        where: { lot_balance_id },
        data: {
          qty_on_hand: new Prisma.Decimal(newOnHand),
          qty_available:
            new Prisma.Decimal(newAvailable),
        },
      });
    });
  }

  // ==================================================
  // RESERVE STOCK
  // จองสินค้า
  // ==================================================
  async reserve(
    lot_balance_id: number,
    qty: number,
  ) {
    if (qty <= 0) {
      throw new BadRequestException(
        'จำนวนจองต้องมากกว่า 0',
      );
    }

    return await this.prisma.$transaction(async (tx) => {
      const row =
        await tx.item_lot_balance.findUnique({
          where: { lot_balance_id },
        });

      if (!row) {
        throw new NotFoundException(
          'ไม่พบข้อมูล lot balance',
        );
      }

      if (qty > Number(row.qty_available)) {
        throw new BadRequestException(
          'สินค้าไม่พอสำหรับการจอง',
        );
      }

      const newReserved =
        Number(row.qty_reserved) + qty;

      const newAvailable =
        Number(row.qty_on_hand) - newReserved;

      return await tx.item_lot_balance.update({
        where: { lot_balance_id },
        data: {
          qty_reserved:
            new Prisma.Decimal(newReserved),
          qty_available:
            new Prisma.Decimal(newAvailable),
        },
      });
    });
  }

  // ==================================================
  // RELEASE RESERVE
  // ยกเลิกจองสินค้า
  // ==================================================
  async releaseReserve(
    lot_balance_id: number,
    qty: number,
  ) {
    if (qty <= 0) {
      throw new BadRequestException(
        'จำนวนยกเลิกจองต้องมากกว่า 0',
      );
    }

    return await this.prisma.$transaction(async (tx) => {
      const row =
        await tx.item_lot_balance.findUnique({
          where: { lot_balance_id },
        });

      if (!row) {
        throw new NotFoundException(
          'ไม่พบข้อมูล lot balance',
        );
      }

      if (qty > Number(row.qty_reserved)) {
        throw new BadRequestException(
          'จำนวนจองไม่พอให้ยกเลิก',
        );
      }

      const newReserved =
        Number(row.qty_reserved) - qty;

      const newAvailable =
        Number(row.qty_on_hand) - newReserved;

      return await tx.item_lot_balance.update({
        where: { lot_balance_id },
        data: {
          qty_reserved:
            new Prisma.Decimal(newReserved),
          qty_available:
            new Prisma.Decimal(newAvailable),
        },
      });
    });
  }

  // ==================================================
  // FIND ALL
  // ==================================================
  async findAll() {
    return await this.prisma.item_lot_balance.findMany({
      orderBy: {
        lot_balance_id: 'desc',
      },
    });
  }

  // ==================================================
  // FIND ONE
  // ==================================================
  async findOne(lot_balance_id: number) {
    const row =
      await this.prisma.item_lot_balance.findUnique({
        where: { lot_balance_id },
      });

    if (!row) {
      throw new NotFoundException(
        'ไม่พบข้อมูล Item Lot Balance',
      );
    }

    return row;
  }

  // ==================================================
  // DELETE
  // ==================================================
  async remove(lot_balance_id: number) {
    const row =
      await this.prisma.item_lot_balance.findUnique({
        where: { lot_balance_id },
      });

    if (!row) {
      throw new NotFoundException(
        'ไม่พบข้อมูล Item Lot Balance',
      );
    }

    return await this.prisma.item_lot_balance.delete({
      where: { lot_balance_id },
    });
  }

  // ==================================================
  // HANDLE PRISMA ERROR
  // ==================================================
  private handlePrismaError(error: any): never {
    if (
      error.code === 'P2002' &&
      error.meta?.target?.includes('lot_id') &&
      error.meta?.target?.includes('warehouse_id') &&
      error.meta?.target?.includes('location_id')
    ) {
      throw new ConflictException(
        'Lot นี้มีอยู่แล้วในคลัง / location นี้',
      );
    }

    throw error;
  }

//   แสดง lot ที่มีตาม item_id
  async findByItem(item_id: number) {
    return await this.prisma.item_lot.findMany({
      where: {
        item_id: item_id,
      },
      orderBy: {
        lot_id: 'desc',
      },
    });
  }
}
