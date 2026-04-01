import { IsString, IsNumber, IsBoolean, IsOptional, IsDateString } from "class-validator";
import { Type } from "class-transformer";

export class CreateSaleAreaDto {
    @IsString()
    employee_group_code: string;    
    @IsString()
    employee_group_name: string;
    @IsString()
    employee_group_nameeng: string;
    @Type(() => Boolean)
    @IsBoolean()
    is_active: boolean;
}