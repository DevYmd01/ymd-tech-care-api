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
                period_target: dto.period_target,
                begin_date: dto.begin_date,
                end_date: dto.end_date,
                close_status: dto.close_status ?? false,
            },
        });
    }
    async findAll() {
        return this.prisma.employee_sale_period.findMany({
            orderBy: { period_id: 'desc' }
        });
    }
    async findOne(id: number) {
        return this.prisma.employee_sale_period.findUnique({
            where: { period_id: id },
        });
    }   
    async update(id: number, dto: UpdateSalePeriodDto) {
        return this.prisma.employee_sale_period.update({
            where: { period_id: id },
            data: {
                period_target: dto.period_target,
                begin_date: dto.begin_date,
                end_date: dto.end_date,
                close_status: dto.close_status,
            },
        });
    }
    async remove(id: number) {
        return this.prisma.employee_sale_period.delete({
            where: { period_id: id },
        });
    }

}
