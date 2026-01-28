import { EmployeeAddressType } from "@prisma/client";
import { IsEnum, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class UpdateAddressDto {

    @IsOptional()
    @IsNumber()
    employee_address_id?: number;

    @IsOptional()
    @IsEnum(EmployeeAddressType)
    address_type: EmployeeAddressType;

    @IsOptional()
    @IsString()
    address: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    district: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    province: string;

    @IsOptional()
    @IsString()
    @MaxLength(10)
    postal_code: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    country: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    contact_person: string;

}
