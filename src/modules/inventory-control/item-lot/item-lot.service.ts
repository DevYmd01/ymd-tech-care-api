import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateItemLotRepository } from './repository/create-item-lot.repository';
import { CreateItemLotMapper } from './mapper/create-item-lot.mapper';
import { CreateItemLotDto } from './dto/create-item-lot.dto';
import { UpdateItemLotRepository } from './repository/update-item-lot.repository';
import { UpdateItemLotMapper } from './mapper/update-item-lot.mapper';
import { UpdateItemLotDto } from './dto/update-item-lot.dto';

@Injectable()
export class ItemLotService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly createItemLotRepository: CreateItemLotRepository,
    private readonly updateItemLotRepository: UpdateItemLotRepository,
  ) {}

  async create(data: CreateItemLotDto) {
    return this.prisma.$transaction(async () => {
      const payload =
        CreateItemLotMapper.toPrismaCreateInput(data);

      return this.createItemLotRepository.create(
        payload,
      );
    });
  }

  async findAll() {
    return this.prisma.item_lot.findMany({
      include: {
        item: true,
        supplier_vendor: true,
      },
      orderBy: {
        lot_id: 'desc',
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.item_lot.findUnique({
      where: {
        lot_id: id,
      },
      include: {
        item: true,
        supplier_vendor: true,
      },
    });
  }

  async update(
    id: number,
    data: UpdateItemLotDto,
  ) {
    return this.prisma.$transaction(async () => {
      const payload =
        UpdateItemLotMapper.toPrismaUpdateInput(data);

      return this.updateItemLotRepository.update(
        id,
        payload,
      );
    });
  }


}