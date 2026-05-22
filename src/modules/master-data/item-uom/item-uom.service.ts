import { Injectable } from '@nestjs/common';
import { ItemUomRepository } from './repository/item-uom.repository';
import { ItemUomMapper } from './mapper/item-uom.mapper';
import { CreateItemUomDto } from './dto/item-uom.dto';
import { Prisma } from '@prisma/client';
import { ConflictException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

@Injectable()
export class ItemUomService {

    constructor(
        private readonly itemUomRepository: ItemUomRepository,
        private readonly prisma: PrismaService
    ) { }

async createItemUom(dto: CreateItemUomDto) {
  try {

    // ==========================================
    // VALIDATION
    // ==========================================

    // from_uom และ to_uom ห้ามเหมือนกัน
    // if (dto.from_uom_id === dto.to_uom_id) {
    //   throw new BadRequestException(
    //     'from_uom_id and to_uom_id cannot be the same',
    //   );
    // }

    // factor ต้องมากกว่า 0
    if (Number(dto.factor) <= 0) {
      throw new BadRequestException(
        'factor must be greater than 0',
      );
    }

    // ==========================================
    // TRANSACTION
    // ==========================================

    return await this.prisma.$transaction(async (tx) => {

      // ==========================================
      // CHECK DUPLICATE
      // ==========================================

      const exists = await tx.item_uom.findFirst({
        where: {
          item_id: dto.item_id,
          from_uom_id: dto.from_uom_id,
          to_uom_id: dto.to_uom_id,
          customer_id: dto.customer_id ?? null,
          is_deleted: false,
        },
      });

      if (exists) {
        throw new ConflictException(
          'UOM conversion already exists',
        );
      }

      // ==========================================
      // CREATE DATA
      // ==========================================

      const data = ItemUomMapper.toCreate(dto);

      const created = await tx.item_uom.create({
        data,
      });

      // ==========================================
      // RESPONSE
      // ==========================================

      return ItemUomMapper.toResponse(created);
    });

  } catch (error) {

    // ==========================================
    // PRISMA UNIQUE ERROR
    // ==========================================

    if (
      error instanceof Prisma.PrismaClientKnownRequestError
    ) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          'Duplicate UOM conversion',
        );
      }
    }

    throw error;
  }
}

    async getAllItemUom() {

        const list = await this.itemUomRepository.findAll();

        return list.map(item =>
            ItemUomMapper.toResponse(item)
        );
    }

    async getItemUomById(item_uom_id: number) {

        const found = await this.itemUomRepository.findById(item_uom_id);

        return ItemUomMapper.toResponse(found);
    }

async updateItemUom(
  item_uom_id: number,
  dto: CreateItemUomDto,
) {
  try {

    // ==========================================
    // VALIDATION
    // ==========================================

    // if (Number(dto.factor) <= 0) {
    //   throw new BadRequestException(
    //     'factor must be greater than 0',
    //   );
    // }

    // ==========================================
    // TRANSACTION
    // ==========================================

    return await this.prisma.$transaction(async (tx) => {

      // ==========================================
      // CHECK EXISTING ITEM_UOM
      // ==========================================

      const existingItemUom =
        await tx.item_uom.findUnique({
          where: {
            item_uom_id,
          },
        });

      if (!existingItemUom) {
        throw new NotFoundException(
          'Item UOM not found',
        );
      }

      // ==========================================
      // CHECK DUPLICATE
      // (exclude current record)
      // ==========================================

      const duplicate =
        await tx.item_uom.findFirst({
          where: {
            item_id: dto.item_id,
            from_uom_id: dto.from_uom_id,
            to_uom_id: dto.to_uom_id,
            customer_id: dto.customer_id ?? null,
            is_deleted: false,

            NOT: {
              item_uom_id,
            },
          },
        });

      if (duplicate) {
        throw new ConflictException(
          'UOM conversion already exists',
        );
      }

      // ==========================================
      // UPDATE
      // ==========================================

      const data =
        ItemUomMapper.toUpdate(dto);

      const updated =
        await tx.item_uom.update({
          where: {
            item_uom_id,
          },
          data,
        });

      // ==========================================
      // RESPONSE
      // ==========================================

      return ItemUomMapper.toResponse(updated);
    });

  } catch (error) {

    // ==========================================
    // PRISMA UNIQUE ERROR
    // ==========================================

    if (
      error instanceof Prisma.PrismaClientKnownRequestError
    ) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          'Duplicate UOM conversion',
        );
      }
    }

    throw error;
  }
}


    async getItemUomByItemId(item_id: number) {

        const list = await this.itemUomRepository.findByItemId(item_id);

        return list.map(item =>
            ItemUomMapper.toResponse(item)
        );
    }

    async getItemByItemIdUoms(item_id: number) {

        const list = await this.itemUomRepository.findByItemUomsByItemId(item_id);

        return list.map(item =>
            ItemUomMapper.toResponseWithItem(item)
        );
    }

}