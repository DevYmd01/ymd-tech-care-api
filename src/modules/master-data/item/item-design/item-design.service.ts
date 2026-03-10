import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDesignDto } from './dto/create-design.dto';

@Injectable()
export class ItemDesignService {
    constructor(private prisma: PrismaService) { }

    async create(createDesignDto: CreateDesignDto) {
        return this.prisma.item_design.create({
            data: {
                item_design_code: createDesignDto.item_design_code,
                item_design_name: createDesignDto.item_design_name,
                item_design_nameeng: createDesignDto.item_design_nameeng || '',
                is_active: createDesignDto.is_active || true,
            },
        });
    }

    async findAll() {
        return this.prisma.item_design.findMany();
    }

    async findOne(item_design_id: number) {
        return this.prisma.item_design.findUnique({
            where: { item_design_id },
        });
    }

    async update(item_design_id: number, updateDesignDto: CreateDesignDto) {
        return this.prisma.item_design.update({
            where: { item_design_id },
            data: {
                item_design_code: updateDesignDto.item_design_code,
                item_design_name: updateDesignDto.item_design_name,
                item_design_nameeng: updateDesignDto.item_design_nameeng || '',
                is_active: updateDesignDto.is_active || true,
            },
        });
    }

    async remove(item_design_id: number) {
        return this.prisma.item_design.delete({
            where: { item_design_id },
        });
    }

}
