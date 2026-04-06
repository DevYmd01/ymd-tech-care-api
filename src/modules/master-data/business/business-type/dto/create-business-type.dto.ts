import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateBusinessTypeDto {
    @IsString()
    @IsNotEmpty()
    business_type_code!: string;

    @IsString()
    @IsNotEmpty()
    business_type_name!: string;
    
    @IsString()
    @IsOptional()
    business_type_nameeng?: string;

    @IsString()
    @IsOptional()
    remark?: string;

    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

}