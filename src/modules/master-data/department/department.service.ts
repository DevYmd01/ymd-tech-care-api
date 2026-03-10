import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Injectable()
export class DepartmentService {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreateDepartmentDto) {
        return this.prisma.org_department.create({ data: dto });
    }

    async findAll() {
        return this.prisma.org_department.findMany();
    }

    async findOne(id: number) {
        return this.prisma.org_department.findUnique({ where: { department_id: id } });
    }

    async update(id: number, dto: CreateDepartmentDto) {
        return this.prisma.org_department.update({ where: { department_id: id }, data: dto });
    }

    async delete(id: number) {
        return this.prisma.org_department.delete({ where: { department_id: id } });
    }
}
