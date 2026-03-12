import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';

@Injectable()
export class WarehouseService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createWarehouseDto: CreateWarehouseDto) {
        return this.prisma.warehouse.create({
            data: {
                warehouse_code: createWarehouseDto.warehouse_code,
                warehouse_name: createWarehouseDto.warehouse_name,
                address: createWarehouseDto.address,
                branch_id: createWarehouseDto.branch_id,
            },
            select: {
                warehouse_id: true,
                warehouse_code: true,
                warehouse_name: true,
                address: true,
                branch_id: true,
            }
        });
    }

    async findAll() {
        return this.prisma.warehouse.findMany({
            select: {
                warehouse_id: true,
                warehouse_code: true,
                warehouse_name: true,
                address: true,
                branch_id: true,
            }
        });
    }

    async findOne(warehouse_id: number) {
        return this.prisma.warehouse.findUnique({
            where: {
                warehouse_id: warehouse_id,
            },
            select: {
                warehouse_id: true,
                warehouse_code: true,
                warehouse_name: true,
                address: true,
                branch_id: true,
            }
        });
    }

    async update(warehouse_id: number, updateWarehouseDto: CreateWarehouseDto) {
        return this.prisma.warehouse.update({
            where: {
                warehouse_id: warehouse_id,
            },
            data: {
                warehouse_code: updateWarehouseDto.warehouse_code,
                warehouse_name: updateWarehouseDto.warehouse_name,
                address: updateWarehouseDto.address,
                branch_id: updateWarehouseDto.branch_id,
            },
            select: {
                warehouse_id: true,
                warehouse_code: true,
                warehouse_name: true,
                address: true,
                branch_id: true,
            }
        });
    }
}
