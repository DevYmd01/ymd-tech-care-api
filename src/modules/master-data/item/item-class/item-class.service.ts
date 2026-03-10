import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateClassDto } from './dto/create-class.dto';

@Injectable()
export class ItemClassService {
    constructor(private prisma: PrismaService) { }

    async create(createClassDto: CreateClassDto) {
        return this.prisma.item_class.create({
            data: {
                item_class_code: createClassDto.item_class_code,
                item_class_name: createClassDto.item_class_name,
                item_class_nameeng: createClassDto.item_class_nameeng || '',
                is_active: createClassDto.is_active || true,
            },
        });
    }

    async findAll() {
        return this.prisma.item_class.findMany();
    }

    async findOne(item_class_id: number) {
        return this.prisma.item_class.findUnique({
            where: { item_class_id },
        });
    }

    async update(item_class_id: number, updateClassDto: CreateClassDto) {
        return this.prisma.item_class.update({
            where: { item_class_id },
            data: {
                item_class_code: updateClassDto.item_class_code,
                item_class_name: updateClassDto.item_class_name,
                item_class_nameeng: updateClassDto.item_class_nameeng || '',
                is_active: updateClassDto.is_active || true,
            },
        });
    }

    async remove(item_class_id: number) {
        return this.prisma.item_class.delete({
            where: { item_class_id },
        });
    }

}
