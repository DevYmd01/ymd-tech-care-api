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
                saletarget_code: dto.saletarget_code,
                saletarget_name: dto.saletarget_name,
                saletarget_nameeng: dto.saletarget_nameeng,
                is_active: dto.is_active ?? true,
            },
        });
    }
    async findAll() {
        return this.prisma.employee_sale_target.findMany({
            where: { is_active: true },
            orderBy: { saletarget_id: 'desc' }
        });
    }   
    async findOne(id: number) {
        return this.prisma.employee_sale_target.findUnique({
            where: { saletarget_id: id },
        });
    }
    async update(id: number, dto: UpdateSaleTargetDto) {
        return this.prisma.employee_sale_target.update({
            where: { saletarget_id: id },
            data: {
                saletarget_code: dto.saletarget_code,
                saletarget_name: dto.saletarget_name,
                saletarget_nameeng: dto.saletarget_nameeng,
                is_active: dto.is_active,
            },
        });
    }
    async remove(id: number) {
        return this.prisma.employee_sale_target.update({
            where: { saletarget_id: id },
            data: { is_active: false },
        });
    }
}
