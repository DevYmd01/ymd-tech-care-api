import { EmployeeAddressType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateAddressDto {

    @IsNotEmpty()
    @IsEnum(EmployeeAddressType)
    address_type: EmployeeAddressType;

    @IsNotEmpty()
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
