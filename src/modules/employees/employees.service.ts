import { Injectable } from '@nestjs/common';
import { CreateEmployeesDto } from './dto/create-employees.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class EmployeesService {
    constructor(private prisma: PrismaService) { }
    create(dto: CreateEmployeesDto) {
        return this.prisma.employees.create({
            data: {
                branch_id: dto.branch_id!,
                employee_code: dto.employee_code!,
                employee_title_th: dto.employee_title_th!,
                employee_title_en: dto.employee_title_en!,
                employee_firstname_th: dto.employee_firstname_th!,
                employee_lastname_th: dto.employee_lastname_th!,
                employee_firstname_en: dto.employee_firstname_en!,
                employee_lastname_en: dto.employee_lastname_en!,
                employee_fullname: dto.employee_fullname!,
                employee_startdate: dto.employee_startdate!,
                employee_resigndate: dto.employee_resigndate!,
                employee_status: dto.employee_status!,
                phone: dto.phone!,
                email: dto.email!,
                remark: dto.remark!,
                tax_id: dto.tax_id!,
                emp_type: dto.emp_type!,
                position_id: dto.position_id!,
                department_id: dto.department_id!,
                is_active: dto.is_active!,
                manager_employee_id: dto.manager_employee_id!,
            }
        });
    }

    findAll() {
        return this.prisma.employees.findMany();
    }

    findOne(id: number) {
        return this.prisma.employees.findUnique({ where: { employee_id: id } });
    }
}
