import { IsString, IsNumber, IsBoolean, IsOptional, IsDateString, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

export class CreateSaleAreaDto {

    @IsString()
    @IsNotEmpty()
    sale_area_code!: string;    
    @IsString()
    @IsNotEmpty()
    sale_area_name!: string;
    @IsString()
    @IsOptional()
    sale_area_nameeng?: string;
    @Type(() => Boolean)
    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}