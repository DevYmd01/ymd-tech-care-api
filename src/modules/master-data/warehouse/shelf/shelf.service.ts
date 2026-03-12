import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateShelfDto } from './dto/create-shelf.dto';

@Injectable()
export class ShelfService {
    constructor(private prisma: PrismaService) { }

    async create(createShelfDto: CreateShelfDto) {
        return this.prisma.shelf.create({
            data: {
                shelf_code: createShelfDto.shelf_code,
                shelf_name: createShelfDto.shelf_name,
                is_active: createShelfDto.is_active,
            },
        });
    }

    async findAll() {
        return this.prisma.shelf.findMany(
            {
                orderBy: { shelf_id: 'asc' }
            }
        );
    }

    async findOne(shelf_id: number) {
        return this.prisma.shelf.findUnique({
            where: { shelf_id },
        });
    }

    async update(shelf_id: number, updateShelfDto: CreateShelfDto) {
        return this.prisma.shelf.update({
            where: { shelf_id },
            data: {
                shelf_code: updateShelfDto.shelf_code,
                shelf_name: updateShelfDto.shelf_name,
                is_active: updateShelfDto.is_active ,
            },
        });
    }

    async remove(shelf_id: number) {
        return this.prisma.shelf.delete({
            where: { shelf_id },
        });
    }

}
