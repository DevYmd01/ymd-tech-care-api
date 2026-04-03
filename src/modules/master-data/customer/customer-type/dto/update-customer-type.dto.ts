import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCustomerTypeDto {
    @IsString()
    @IsNotEmpty()
    customer_type_code!: string ;
    @IsString()
    @IsNotEmpty()
    customer_type_name!: string;
    @IsString()
    @IsOptional()
    customer_type_nameeng?: string;
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}