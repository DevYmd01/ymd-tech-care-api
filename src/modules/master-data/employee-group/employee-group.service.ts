import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class EmployeeGroupService {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreateGroupDto) {
        return this.prisma.employee_group.create({
            data: {
                employee_group_code: dto.employee_group_code,
                employee_group_name: dto.employee_group_name,
                employee_group_nameeng: dto.employee_group_nameeng,
                is_active: dto.is_active ?? true,
            },
        });
    }

    async findAll() {
        return this.prisma.employee_group.findMany({
            where: { is_active: true },
            orderBy: { employee_group_id: 'desc' }
        });
    }

    async findOne(id: number) {
        return this.prisma.employee_group.findUnique({
            where: { employee_group_id: id },
        });
    }

    async update(id: number, dto: UpdateGroupDto) {
        return this.prisma.employee_group.update({
            where: { employee_group_id: id },
            data: {
                employee_group_code: dto.employee_group_code,
                employee_group_name: dto.employee_group_name,
                employee_group_nameeng: dto.employee_group_nameeng,
                is_active: dto.is_active,
            },
        });
    }

    async remove(id: number) {
        return this.prisma.employee_group.update({
            where: { employee_group_id: id },
            data: { is_active: false },
        });
    }

}
