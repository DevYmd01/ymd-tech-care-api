import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEmployeeSideDto } from './dto/create-employee-side.dto';

@Injectable()
export class EmployeeSideService {
    constructor(private readonly prisma: PrismaService) { }

    async create(dto: CreateEmployeeSideDto) {
        return this.prisma.employee_side.create({ data: dto });
    }

    async findAll() {
        return this.prisma.employee_side.findMany();
    }

    async findOne(id: number) {
        return this.prisma.employee_side.findUnique({ where: { emp_side_id: id } });
    }
    async update(id: number, dto: CreateEmployeeSideDto) {
        return this.prisma.employee_side.update({ where: { emp_side_id: id }, data: dto });
    }

    async delete(id: number) {
        return this.prisma.employee_side.delete({ where: { emp_side_id: id } });
    }
}
