import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemMasterDto } from './dto/create-item-master.dto';
import { CreateItemMasterRepository } from './repository/create-item-master.repository';
import { Prisma } from '@prisma/client';
import { ConflictException } from '@nestjs/common';
import { UpdateItemMasterDto } from './dto/update-item-master.dto';
import { UpdateItemMasterRepository } from './repository/update-item-master.repository';

@Injectable()
export class ItemMasterService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly createItemMasterRepository: CreateItemMasterRepository,
        private readonly updateItemMasterRepository: UpdateItemMasterRepository
    ) { }

    async createItemMaster(itemMaster: CreateItemMasterDto) {
        try {
            return await this.createItemMasterRepository.createItemMaster({
                tx: this.prisma,
                itemMaster: itemMaster,
            });
        } catch (error: unknown) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new ConflictException('item_code already exists')
            }
            throw error
        }
    }

    async getAllItemMaster() {
        return this.prisma.item.findMany();
    }

    async getItemMasterById(item_id: number) {
        return this.prisma.item.findUnique({
            where: {
                item_id: item_id,
            },
        });
    }

    async updateItemMaster(item_id: number, itemMaster: UpdateItemMasterDto) {
        try {
            return await this.updateItemMasterRepository.updateItemMaster({
                tx: this.prisma,
                itemMaster: itemMaster,
                item_id: item_id,
            });
        } catch (error: unknown) {
            if (
                error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002'
            ) {
                throw new ConflictException('item_code already exists')
            }
            throw error
        }
    }
}
