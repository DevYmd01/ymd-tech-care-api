import { Injectable } from '@nestjs/common';
import { CreateCustomerGroupDto } from './dto/create-customer-group.dto';
import { UpdateCustomerGroupDto } from './dto/update-customer-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CustomerGroupService {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreateCustomerGroupDto) {
        return this.prisma.customer_group.create({
            data: {
                customer_group_code: dto.customer_group_code,
                customer_group_name: dto.customer_group_name,
                customer_group_nameeng: dto.customer_group_nameeng,
                is_active: dto.is_active
            }
        });
    }
    async findAll() {
        return this.prisma.customer_group.findMany({
            where: { is_active: true },
            orderBy: { customer_group_id: 'asc' }
        });
    }
    async findOne(id: number) {
        return this.prisma.customer_group.findUnique({
            where: { customer_group_id: id },
        });
    }
    async update(id: number, dto: UpdateCustomerGroupDto) {
        return this.prisma.customer_group.update({
            where: { customer_group_id: id },
            data: {
                customer_group_code: dto.customer_group_code,
                customer_group_name: dto.customer_group_name,
                customer_group_nameeng: dto.customer_group_nameeng,
                is_active: dto.is_active
            }
        });
    }
    async remove(id: number) {
        return this.prisma.customer_group.delete({
            where: { customer_group_id: id },
        });
    }
}
