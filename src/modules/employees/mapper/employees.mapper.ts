import { Injectable } from '@nestjs/common';
import { CreateEmployeesDto } from '../dto/create-employees.dto';
import { UpdateEmployeesDto } from '../dto/update-employees.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeesMapper {
  toPrismaCreateInput(dto: CreateEmployeesDto): Prisma.employeesCreateInput {
    const employee_fullname = `${dto.employee_firstname_th} ${dto.employee_lastname_th}`;
    const employee_fullname_en = `${dto.employee_firstname_en} ${dto.employee_lastname_en}`;

    return {
        branch: { connect: { branch_id: dto.branch_id } },
        employee_code: dto.employee_code,
        employee_title_th: dto.employee_title_th,
        employee_title_en: dto.employee_title_en,
        employee_firstname_th: dto.employee_firstname_th,
        employee_lastname_th: dto.employee_lastname_th,
        employee_firstname_en: dto.employee_firstname_en,
        employee_lastname_en: dto.employee_lastname_en,
        employee_fullname,
        employee_fullname_en,
        employee_startdate: dto.employee_startdate ,
        employee_resigndate: dto.employee_resigndate ? new Date(dto.employee_resigndate) : null,
        employee_status: dto.employee_status,
        phone: dto.phone,
        email: dto.email,
        remark: dto.remark,
        tax_id: dto.tax_id,
        emp_type: dto.emp_type,

        position: dto.position_id
            ? { connect: { position_id: dto.position_id } }
            : undefined,

        employeeHead: dto.employee_head_id
            ? { connect: { employee_id: dto.employee_head_id } }
            : undefined,

        department: dto.emp_dept_id
            ? { connect: { emp_dept_id: dto.emp_dept_id } }
            : undefined,

        is_active: dto.is_active
    };
}

   toPrismaUpdateInput(dto: CreateEmployeesDto | UpdateEmployeesDto): Prisma.employeesUpdateInput { 
    const employee_fullname = `${dto.employee_firstname_th} ${dto.employee_lastname_th}`;
    const employee_fullname_en = `${dto.employee_firstname_en} ${dto.employee_lastname_en}`;

   return {
    branch: dto.branch_id
        ? { connect: { branch_id: dto.branch_id } }
        : undefined,

    employee_code: dto.employee_code,
    employee_title_th: dto.employee_title_th,
    employee_title_en: dto.employee_title_en,
    employee_firstname_th: dto.employee_firstname_th,
    employee_lastname_th: dto.employee_lastname_th,
    employee_firstname_en: dto.employee_firstname_en,
    employee_lastname_en: dto.employee_lastname_en,
    employee_fullname,
    employee_fullname_en,

    employee_startdate: dto.employee_startdate,
    employee_resigndate: dto.employee_resigndate
        ? new Date(dto.employee_resigndate)
        : null,

    employee_status: dto.employee_status,
    phone: dto.phone,
    email: dto.email,
    remark: dto.remark,
    tax_id: dto.tax_id,
    emp_type: dto.emp_type,

    position: dto.position_id
        ? { connect: { position_id: dto.position_id } }
        : undefined,

    employeeHead: dto.employee_head_id
        ? { connect: { employee_id: dto.employee_head_id } }
        : undefined,

    department: dto.emp_dept_id
        ? { connect: { emp_dept_id: dto.emp_dept_id } }
        : undefined,

    is_active: dto.is_active
};
}
}