import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateBillGroupDto } from './dto/create-bill-group.dto';
import { UpdateBillGroupDto } from './dto/update-bill-group.dto';

@Injectable()
export class BillGroupService {
    constructor(private readonly prisma: PrismaService) {}
    async create(dto: CreateBillGroupDto) {
        return this.prisma.bill_group.create({
            data: {
                bill_group_code: dto.bill_group_code,
                bill_group_name: dto.bill_group_name,
                bill_group_nameeng: dto.bill_group_nameeng,
                is_active: dto.is_active ?? true,
            },
        });
    }
    async findAll() {
        return this.prisma.bill_group.findMany({
            where: { is_active: true },
            orderBy: { bill_group_id: 'asc' },
        });
    }   
    async findOne(id: number) {
        return this.prisma.bill_group.findUnique({
            where: { bill_group_id: id },
        });
    }
    async update(id: number, dto: UpdateBillGroupDto) {
        return this.prisma.bill_group.update({
            where: { bill_group_id: id },
            data: {
                bill_group_code: dto.bill_group_code,
                bill_group_name: dto.bill_group_name,
                bill_group_nameeng: dto.bill_group_nameeng,
                is_active: dto.is_active,
            },
        });
    }
    async remove(id: number) {
        return this.prisma.bill_group.delete({
            where: { bill_group_id: id },
        });
    }
}
