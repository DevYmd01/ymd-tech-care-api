import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateCustomerGroupDto {
    @IsString()
    @IsNotEmpty()
    customer_group_code!: string;
    @IsString()
    @IsNotEmpty()
    customer_group_name!: string;
    @IsString()
    @IsOptional()
    customer_group_nameeng?: string;
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}