import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Injectable()
export class DepartmentService {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreateDepartmentDto) {
        return this.prisma.employee_department.create({ data: dto });
    }

    async findAll() {
        return this.prisma.employee_department.findMany();
    }

    async findOne(id: number) {
        return this.prisma.employee_department.findUnique({ where: { emp_dept_id: id } });
    }

    async update(id: number, dto: CreateDepartmentDto) {
        return this.prisma.employee_department.update({ where: { emp_dept_id: id }, data: dto });
    }

    async delete(id: number) {
        return this.prisma.employee_department.delete({ where: { emp_dept_id: id } });
    }
}
