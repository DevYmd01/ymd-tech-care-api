import { Injectable } from '@nestjs/common';
import { CreateBillGruopDto } from './dto/create-bill-gruop.dto';
import { UpdateBillGruopDto } from './dto/update-bill-gruop.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BillGruopService {
    constructor(private readonly prisma: PrismaService) {}
    async create(dto: CreateBillGruopDto) {
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
    async update(id: number, dto: UpdateBillGruopDto) {
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
