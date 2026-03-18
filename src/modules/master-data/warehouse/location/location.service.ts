import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationService {
    constructor(private readonly prisma: PrismaService) { }

    async create(createLocationDto: CreateLocationDto) {
        return this.prisma.location.create({
            data: {
                warehouse_id: createLocationDto.warehouse_id,
                shelf_id: createLocationDto.shelf_id,
                location_code: createLocationDto.location_code,
                location_name: createLocationDto.location_name,
                location_nameeng: createLocationDto.location_nameeng,
                is_active: createLocationDto.is_active,
                created_at: new Date(),
                updated_at: new Date(),
            },
        });
    }

async findAll() {
    return this.prisma.location.findMany({
        orderBy: [
            { location_id: 'desc' }
        ],
    });
}

    async findOne(id: number) {
        return this.prisma.location.findUnique({ where: { location_id: id } });
    }

    async update(id: number, updateLocationDto: CreateLocationDto) {
        return this.prisma.location.update({
            where: { location_id: id },
            data: {
                warehouse_id: updateLocationDto.warehouse_id,
                shelf_id: updateLocationDto.shelf_id,
                location_code: updateLocationDto.location_code,
                location_name: updateLocationDto.location_name,
                location_nameeng: updateLocationDto.location_nameeng,
                is_active: updateLocationDto.is_active,
                updated_at: new Date(),
            },
        });
    }

    async remove(id: number) {
        return this.prisma.location.update({
            where: { location_id: id },
            data: {
                is_active: false,
                updated_at: new Date(),
            },
        });
    }

    async findByWarehouse(warehouse_id: number) {
        return this.prisma.location.findMany({
            where: { warehouse_id: warehouse_id, is_active: true },
            orderBy: [
                { location_id: 'desc' }
            ],
        });
    }
}
