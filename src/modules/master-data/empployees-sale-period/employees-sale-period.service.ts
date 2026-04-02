import { Injectable } from '@nestjs/common';
import { CreateSalePeriodDto } from './dto/create-sale-period.dto';
import { UpdateSalePeriodDto } from './dto/update-sale-period.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class EmployeesSalePeriodService {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreateSalePeriodDto) {
        return this.prisma.employee_sale_period.create({
            data: {
                saleperiod_code: dto.saleperiod_code,
                saleperiod_name: dto.saleperiod_name,
                saleperiod_nameeng: dto.saleperiod_nameeng,
                is_active: dto.is_active ?? true,
            },
        });
    }

    async findAll() {
        return this.prisma.employee_sale_period.findMany({
            where: { is_active: true },
            orderBy: { saleperiod_id: 'desc' }
        });
    }

    async findOne(id: number) {
        return this.prisma.employee_sale_period.findUnique({
            where: { saleperiod_id: id },
        });
    }

    async update(id: number, dto: UpdateSalePeriodDto) {
        return this.prisma.employee_sale_period.update({
            where: { saleperiod_id: id },
            data: {
                saleperiod_code: dto.saleperiod_code,
                saleperiod_name: dto.saleperiod_name,
                saleperiod_nameeng: dto.saleperiod_nameeng,
                is_active: dto.is_active,
            },
        });
    }

    async remove(id: number) {
        return this.prisma.employee_sale_period.update({
            where: { saleperiod_id: id },
            data: { is_active: false },
        });
    }

}
