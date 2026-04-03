import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateCustomerTypeDto } from './dto/create-customer-type.dto';
import { UpdateCustomerTypeDto } from './dto/update-customer-type.dto';

@Injectable()
export class CustomerTypeService {
    constructor(private readonly prisma: PrismaService) {}

    async create(dto: CreateCustomerTypeDto) {
        return this.prisma.customer_type.create({ data: dto });
    }

    async findAll() {
        return this.prisma.customer_type.findMany();
    }

    async findOne(id: number) {
        return this.prisma.customer_type.findUnique({ where: { customer_type_id: id } });
    }

    async update(id: number, dto: UpdateCustomerTypeDto) {
        return this.prisma.customer_type.update({ where: { customer_type_id: id }, data: dto });
    }

    async remove(id: number) {
        return this.prisma.customer_type.delete({ where: { customer_type_id: id } });
    }
}
