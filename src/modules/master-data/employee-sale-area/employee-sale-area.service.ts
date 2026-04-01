import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSaleAreaDto } from './dto/create-sale-area.dto';
import { UpdateSaleAreaDto } from './dto/update-sale-area.dto';

@Injectable()
export class EmployeeSaleAreaService {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreateSaleAreaDto) {
        return this.prisma.employee_sale_area.create({
            data: {
                sale_area_code: dto.sale_area_code,
                sale_area_name: dto.sale_area_name,
                sale_area_nameeng: dto.sale_area_nameeng,
                is_active: dto.is_active ?? true,
            },
        });
    }

    async findAll() {
        return this.prisma.employee_sale_area.findMany();
    }

    async findOne(id: number) {
        return this.prisma.employee_sale_area.findUnique({
            where: { sale_area_id: id },
        });
    }

    async update(id: number, dto: UpdateSaleAreaDto) {
        return this.prisma.employee_sale_area.update({
            where: { sale_area_id: id },
            data: {
                sale_area_code: dto.sale_area_code,
                sale_area_name: dto.sale_area_name,
                sale_area_nameeng: dto.sale_area_nameeng,
                is_active: dto.is_active ?? true,
            },
        });
    }

    async remove(id: number) {
        return this.prisma.employee_sale_area.delete({
            where: { sale_area_id: id },
        });
    }
}
