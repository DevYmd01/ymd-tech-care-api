import {
    IsBoolean,
    IsDateString,
    IsEmail,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
    ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateAddressDto } from './creact-address.dto';

export class CreateEmployeesDto {
    @IsNumber()
    branch_id: number;

    @IsString()
    @MaxLength(20)
    employee_code: string;

    @IsString()
    @MaxLength(20)
    employee_title_th: string;

    @IsString()
    @MaxLength(20)
    employee_title_en: string;

    @IsString()
    @MaxLength(200)
    employee_firstname_th: string;

    @IsString()
    @MaxLength(200)
    employee_lastname_th: string;

    @IsString()
    @MaxLength(200)
    employee_firstname_en: string;

    @IsString()
    @MaxLength(200)
    employee_lastname_en: string;

    @IsString()
    @MaxLength(400)
    employee_fullname: string;

    @IsDateString()
    employee_startdate: string;

    @IsOptional()
    @IsDateString()
    employee_resigndate?: string;

    @IsString()
    employee_status: string;

    @IsString()
    @MaxLength(20)
    phone: string;

    @IsEmail()
    @MaxLength(255)
    email: string;

    @IsOptional()
    @IsString()
    remark?: string;

    @IsOptional()
    @IsString()
    tax_id?: string;

    @IsBoolean()
    emp_type: boolean;

    @IsNumber()
    position_id: number;

    @IsNumber()
    department_id: number;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

    @IsOptional()
    @IsNumber()
    manager_employee_id?: number;

    @IsOptional()
    @Type(() => CreateAddressDto)
    @ValidateNested({ each: true })
    addresses?: CreateAddressDto[];
}
