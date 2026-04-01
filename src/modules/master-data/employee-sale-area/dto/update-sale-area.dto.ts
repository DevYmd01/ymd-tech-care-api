import { IsString, IsNumber, IsBoolean, IsOptional, IsDateString } from "class-validator";
import { Type } from "class-transformer";

export class UpdateSaleAreaDto {
    @IsString()
    sale_area_code: string;    
    @IsString()
    sale_area_name: string;
    @IsString()
    sale_area_nameeng: string;
    @Type(() => Boolean)
    @IsBoolean()
    is_active: boolean;
}

// EmployeeSaleArea