import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateItemMasterDto } from './dto/create-item-master.dto';
import { CreateItemMasterRepository } from './repository/create-item-master.repository';

@Injectable()
export class ItemMasterService {
    constructor(private readonly prisma: PrismaService, private readonly createItemMasterRepository: CreateItemMasterRepository) { }

    async createItemMaster(itemMaster: CreateItemMasterDto) {
        return this.createItemMasterRepository.createItemMaster({
            tx: this.prisma,
            itemMaster: itemMaster,
        });
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
}
