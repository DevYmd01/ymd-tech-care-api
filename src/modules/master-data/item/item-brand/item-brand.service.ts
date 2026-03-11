import { Injectable } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemBrandService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createBrandDto: CreateBrandDto) {
        return await this.prisma.item_brand.create({
            data: {
                item_brand_code: createBrandDto.item_brand_code,
                item_brand_name: createBrandDto.item_brand_name,
                item_brand_nameeng: createBrandDto.item_brand_nameeng || '',
                is_active: createBrandDto.is_active || true
            }
        });
    }

    async findAll() {
        return await this.prisma.item_brand.findMany({
            orderBy: {
                item_brand_id: 'desc'
            }
        });
    }

    async findOne(item_brand_id: number) {
        return await this.prisma.item_brand.findUnique({
            where: {
                item_brand_id: item_brand_id
            }
        });
    }

    async update(item_brand_id: number, updateBrandDto: CreateBrandDto) {
        return await this.prisma.item_brand.update({
            where: {
                item_brand_id: item_brand_id
            },
            data: {
                item_brand_code: updateBrandDto.item_brand_code,
                item_brand_name: updateBrandDto.item_brand_name,
                item_brand_nameeng: updateBrandDto.item_brand_nameeng || '',
                is_active: updateBrandDto.is_active
            }
        });
    }

    async remove(item_brand_id: number) {
        return await this.prisma.item_brand.update({
            where: {
                item_brand_id: item_brand_id
            },
            data: {
                is_active: false
            }
        });
    }
}
