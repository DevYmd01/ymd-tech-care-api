import { Injectable } from '@nestjs/common';
import { CreateItemGradeDto } from './dto/create-item-grade.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemGradeService {
    constructor(private prisma: PrismaService) { }

    async create(createItemGradeDto: CreateItemGradeDto) {
        return this.prisma.item_grade.create({
            data: {
                item_grade_code: createItemGradeDto.item_grade_code,
                item_grade_name: createItemGradeDto.item_grade_name,
                item_grade_nameeng: createItemGradeDto.item_grade_nameeng || '',
                is_active: createItemGradeDto.is_active || true,
            },
        });
    }

    async findAll() {
        return this.prisma.item_grade.findMany(
            {
                orderBy: { item_grade_id: 'asc' }
            }
        );
    }

    async findOne(item_grade_id: number) {
        return this.prisma.item_grade.findUnique({
            where: { item_grade_id },
        });
    }

    async update(item_grade_id: number, updateItemGradeDto: CreateItemGradeDto) {
        return this.prisma.item_grade.update({
            where: { item_grade_id },
            data: {
                item_grade_code: updateItemGradeDto.item_grade_code,
                item_grade_name: updateItemGradeDto.item_grade_name,
                item_grade_nameeng: updateItemGradeDto.item_grade_nameeng || '',
                is_active: updateItemGradeDto.is_active || true,
            },
        });
    }

    async remove(item_grade_id: number) {
        return this.prisma.item_grade.delete({
            where: { item_grade_id },
        });
    }

}
