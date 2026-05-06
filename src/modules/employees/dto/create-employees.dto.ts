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
    branch_id!: number;

    @IsString()
    @MaxLength(20)
    employee_code!: string;

    @IsString()
    @MaxLength(20)
    employee_title_th!: string;

    @IsString()
    @MaxLength(20)
    employee_title_en!: string;

    @IsString()
    @MaxLength(200)
    employee_firstname_th!: string;

    @IsString()
    @MaxLength(200)
    employee_lastname_th!: string;

    @IsString()
    @IsOptional()
    @MaxLength(200)
    employee_firstname_en!: string;

    @IsString()
    @MaxLength(200)
    employee_lastname_en!: string;

    @IsDateString()
    employee_startdate!: string;

        @IsOptional()
    @IsDateString()
    employee_resigndate?: string;

      @IsOptional()
    @IsNumber()
    employee_status: number;

    @IsString()
    @MaxLength(20)
    phone!: string;

    @IsEmail()
    @MaxLength(255)
    email!: string;

    @IsOptional()
    @IsString()
    remark?: string;

    @IsOptional()
    @IsString()
    tax_id?: string;

    @IsString()
    @IsOptional()
    emp_type?: string;

    @IsNumber()
    position_id!: number;

    @IsNumber()
    emp_dept_id!: number;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

    @IsOptional()
    @IsNumber()
    employee_head_id?: number;

    @IsOptional()
    @Type(() => CreateAddressDto)
    @ValidateNested({ each: true })
    addresses?: CreateAddressDto[];
}
