import { CreatePriceListHeaderDto } from '../dto/create-price-list-header.dto';
import { Prisma } from '@prisma/client';

export class CreatePriceListHeaderMapper {
    static toPrismaCreateInput(
        dto: CreatePriceListHeaderDto,
    ): Prisma.price_list_headerCreateInput {
        return {
            price_list_no: dto.price_list_no, // ใช้ชื่อแทนเลขที่ เพราะไม่มีเลขที่ใน DTO
            price_list_name: dto.price_list_name,
            price_list_date: dto.price_list_date,
            remark: dto.remark,
            begin_date: dto.begin_date,
            end_date: dto.end_date,
            changed_date: dto.changed_date,
            is_active: dto.is_active,
            price_list_flag: dto.price_list_flag,
            ...(dto.branch_id ? { branch: { connect: { branch_id: dto.branch_id } } } : {}),
            ...(dto.customer_group_id ? { customer_group: { connect: { customer_group_id: dto.customer_group_id } } } : {}),
            ...(dto.customer_id ? { customer: { connect: { customer_id: dto.customer_id } } } : {}),
            ...(dto.emp_dept_id ? { employee_department: { connect: { emp_dept_id: dto.emp_dept_id } } } : {}),
            ...(dto.permit_emp_id ? { permit_emp: { connect: { employee_id: dto.permit_emp_id } } } : {}),
            ...(dto.save_emp_id ? { save_emp: { connect: { employee_id: dto.save_emp_id } } } : {}),
        }
    }

}