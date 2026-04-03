import { Injectable } from '@nestjs/common';
import { CreateSaleTargetDto } from './dto/create-sale-target.dto';
import { UpdateSaleTargetDto } from './dto/update-sale-target.dto';
import { PrismaService } from '@/prisma/prisma.service';

@Injectable()
export class EmpployeesSaleTargetService {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreateSaleTargetDto) {
        return this.prisma.employee_sale_target.create({
            data: {
                list_no: dto.list_no,
                emp_id: dto.emp_id,
                period_id: dto.period_id,
                period_target: dto.period_target,
            },
        });
    }
    async findAll() {
        return this.prisma.employee_sale_target.findMany({
            orderBy: { target_id: 'desc' }
        });
    }
    async findOne(id: number) {
        return this.prisma.employee_sale_target.findUnique({
            where: { target_id: id },
        });
    }
    async update(id: number, dto: UpdateSaleTargetDto) {
        return this.prisma.employee_sale_target.update({
            where: { target_id: id },
            data: {
                list_no: dto.list_no,
                emp_id: dto.emp_id,
                period_id: dto.period_id,
                period_target: dto.period_target,
            },
        });
    }
    async remove(id: number) {
        return this.prisma.employee_sale_target.delete({
            where: { target_id: id },
        });
    }
}
