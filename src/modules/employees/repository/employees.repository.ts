import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeesRepository {
    constructor(private prisma: PrismaService) {}

    async create(tx: any, data: Prisma.employeesCreateInput) {
        return tx.employees.create({ data });
    }

    async update(tx: any, employee_id: number, data: Prisma.employeesUpdateInput) {
        return tx.employees.update({
            where: { employee_id },
            data,
        });
    }




}