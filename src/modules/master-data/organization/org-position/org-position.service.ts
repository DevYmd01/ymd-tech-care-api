import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePositionDto } from './dto/create-position.dto';
import { UpdatePositionDto } from './dto/update-positon.dto';

@Injectable()
export class OrgPositionService {
    constructor(private prisma: PrismaService) { }
    create(dto: CreatePositionDto) {
        return this.prisma.employee_position.create({
            data: {
                position_code: dto.position_code,
                position_name: dto.position_name,
                position_nameeng: dto.position_nameeng,
                is_active: dto.is_active ?? true,
            },
        });
    }

    findAll() {
        return this.prisma.employee_position.findMany();
    }

    findOne(id: number) {
        return this.prisma.employee_position.findUnique({ where: { position_id: id } });
    }

    update(position_id: number, dto: UpdatePositionDto) {
        return this.prisma.employee_position.update({
            where: { position_id: position_id },
            data: {
                position_code: dto.position_code,
                position_name: dto.position_name,
                position_nameeng: dto.position_nameeng,
                is_active: dto.is_active ?? true,
            },
        });
    }

    delete(id: number) {
        return this.prisma.employee_position.delete({ where: { position_id: id } });
    }
}
