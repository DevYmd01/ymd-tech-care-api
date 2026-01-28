
import { CreateEmployeesDto } from "./create-employees.dto";
import { IsOptional, IsNumber, IsString, MaxLength, IsDate, IsBoolean, IsArray, ValidateNested, IsDateString } from "class-validator";
import { Type } from "class-transformer";
import { PartialType } from "@nestjs/mapped-types";
import { UpdateAddressDto } from "./update-address.dto";

export class UpdateEmployeesDto extends PartialType(CreateEmployeesDto) {

    @IsOptional()
    @IsNumber()
    employee_id: number;

    @IsOptional()
    @IsNumber()
    branch_id: number;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    employee_code: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    employee_title_th: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    employee_title_en: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    employee_firstname_th: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    employee_lastname_th: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    employee_firstname_en: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    employee_lastname_en: string;

    @IsOptional()
    @IsString()
    @MaxLength(200)
    employee_fullname: string;

    @IsOptional()
    @IsDateString()
    employee_startdate: string;

    @IsOptional()
    @IsDateString()
    employee_resigndate: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    employee_status: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    phone: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    email: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    remark: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    tax_id: string;

    @IsOptional()
    @IsBoolean()
    emp_type: boolean;

    @IsOptional()
    @IsNumber()
    position_id: number;

    @IsOptional()
    @IsNumber()
    department_id: number;

    @IsOptional()
    @IsBoolean()
    is_active: boolean;

    @IsOptional()
    @IsNumber()
    manager_employee_id: number;

    @IsOptional()
    @Type(() => UpdateAddressDto)
    @ValidateNested({ each: true })
    addresses?: UpdateAddressDto[];
}