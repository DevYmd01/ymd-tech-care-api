import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUomDto } from './dto/creat-uom.dto';

@Injectable()
export class UomService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async createUom(uom: CreateUomDto) {
        return this.prisma.uom.create({
            data: {
                uom_code: uom.uom_code,
                uom_name: uom.uom_name,
                uom_nameeng: uom.uom_nameeng || null,
                is_active: uom.is_active || true,
            },
        });
    }

    async getAllUom() {
        return this.prisma.uom.findMany();
    }

    async getUomById(uom_id: number) {
        return this.prisma.uom.findUnique({
            where: {
                uom_id: uom_id,
            },
        });
    }

    async updateUom(uom_id: number, updateUomDto: CreateUomDto) {
        return this.prisma.uom.update({
            where: {
                uom_id: uom_id,
            },
            data: {
                uom_code: updateUomDto.uom_code,
                uom_name: updateUomDto.uom_name,
                uom_nameeng: updateUomDto.uom_nameeng || null,
                is_active: updateUomDto.is_active || true,
            },
        });
    }

    async deleteUom(uom_id: number) {
        return this.prisma.uom.delete({
            where: {
                uom_id: uom_id,
            },
        });
    }
}

