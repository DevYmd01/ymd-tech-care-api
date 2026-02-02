import { Injectable } from '@nestjs/common';
import { CreatePatternDto } from './dto/create-pattern.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemPatternService {
    constructor(private prisma: PrismaService) { }

    async create(createPatternDto: CreatePatternDto) {
        return this.prisma.item_pattern.create({
            data: {
                item_pattern_code: createPatternDto.item_pattern_code,
                item_pattern_name: createPatternDto.item_pattern_name,
                item_pattern_nameeng: createPatternDto.item_pattern_nameeng || '',
                is_active: createPatternDto.is_active || true,
            },
        });
    }

    async findAll() {
        return this.prisma.item_pattern.findMany();
    }

    async findOne(item_pattern_id: number) {
        return this.prisma.item_pattern.findUnique({
            where: { item_pattern_id },
        });
    }

    async update(item_pattern_id: number, updatePatternDto: CreatePatternDto) {
        return this.prisma.item_pattern.update({
            where: { item_pattern_id },
            data: {
                item_pattern_code: updatePatternDto.item_pattern_code,
                item_pattern_name: updatePatternDto.item_pattern_name,
                item_pattern_nameeng: updatePatternDto.item_pattern_nameeng || '',
                is_active: updatePatternDto.is_active || true,
            },
        });
    }

    async remove(item_pattern_id: number) {
        return this.prisma.item_pattern.delete({
            where: { item_pattern_id },
        });
    }

}
