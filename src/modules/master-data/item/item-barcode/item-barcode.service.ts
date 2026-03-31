import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateItemBarcodeDto } from './dto/create-item-barcode.dto';
import { UpdateItemBarcodeDto } from './dto/update-item-barcode.dto';

@Injectable()
export class ItemBarcodeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateItemBarcodeDto) {
    return this.prisma.item_barcode.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.item_barcode.findMany();
  }

  async findOne(id: number) {
    const data = await this.prisma.item_barcode.findUnique({
      where: { item_barcode_id: id },
    });

    if (!data) {
      throw new NotFoundException('Item barcode not found');
    }

    return data;
  }

  async update(id: number, dto: UpdateItemBarcodeDto) {
    await this.findOne(id);

    return this.prisma.item_barcode.update({
      where: { item_barcode_id: id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.item_barcode.delete({
      where: { item_barcode_id: id },
    });
  }
}