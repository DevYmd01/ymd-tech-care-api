import { Injectable } from '@nestjs/common';
import { CreateInventoryOptionMapper } from './mapper/create-inventory-option.mapper';
import { CreateInventoryOptionRepository } from './repository/create-inventory-option.repository';
import { CreateInventoryOptionDto } from './dto/create-inventory-option.dto';
import { UpdateInventoryOptionMapper } from './mapper/update-inventory-option.mapper';
import { UpdateInventoryOptionRepository } from './repository/update-inventory-option.repository';
import { UpdateInventoryOptionDto } from './dto/update-inventory-option.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InventoryOptionService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly createInventoryOptionRepository: CreateInventoryOptionRepository,
        private readonly updateInventoryOptionRepository: UpdateInventoryOptionRepository
    ) {}

    async create(createInventoryOptionDto: CreateInventoryOptionDto) {
        return this.prisma.$transaction(async (tx) => {
            const inventoryOptionData = CreateInventoryOptionMapper.toPrismaCreateInput(createInventoryOptionDto);
            const inventoryOption = await this.createInventoryOptionRepository.create(tx, inventoryOptionData);   
            return inventoryOption;
        });
    }

    async findAll() {
        return this.prisma.ic_option.findMany();
    }

    async findOne(id: number) {
        return this.prisma.ic_option.findUnique({
            where: { ic_option_id: id },
        });
    }

    async update(id: number, updateInventoryOptionDto: UpdateInventoryOptionDto) {
        return this.prisma.$transaction(async (tx) => {
            const inventoryOptionData = UpdateInventoryOptionMapper.toPrismaUpdateInput(updateInventoryOptionDto);
            const inventoryOption = await this.updateInventoryOptionRepository.update(tx, id, inventoryOptionData);
            return inventoryOption;
        });
    }
}
