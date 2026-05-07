import {
    IsInt,
    IsOptional,
    IsString,
    IsDateString,
    IsArray,
    ValidateNested,
    IsNumber,
    IsDecimal,
    IsNotEmpty,
    IsDate,
    Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ArrayMinSize } from 'class-validator';

export class CreateDeliveryHeaderDto {
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
delivery_date!: Date;
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
so_id!: number;
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
customer_id!: number;
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
branch_id!: number;
    @IsOptional()
    @IsString()
ship_to_address?: string;
    @IsOptional()
    @IsString()
ship_method?: string;
    @IsOptional()
    @IsString()
carrier?: string;
    @IsOptional()
    @IsString()
tracking_no?: string;
    @IsNotEmpty()
    @IsString()
status!: string;
    @IsOptional()
    @IsInt()
    @Type(() => Number) 
ship_by_emp?: number;
    @IsOptional()
    @IsString()
docu_date?: Date;
    @IsOptional()
    @IsString()
remarks?: string;
}

export class UpdateDeliveryHeaderDto {
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
delivery_date!: Date;
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
so_id!: number;
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
customer_id!: number;
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
branch_id!: number;
    @IsOptional()
    @IsString()
ship_to_address?: string;
    @IsOptional()
    @IsString()
ship_method?: string;
    @IsOptional()
    @IsString()
carrier?: string;
    @IsOptional()
    @IsString()
tracking_no?: string;
    @IsNotEmpty()
    @IsString()
status!: string;
    @IsOptional()
    @IsInt()
    @Type(() => Number) 
ship_by_emp?: number;
    @IsOptional()
    @IsString()
docu_date?: Date;
    @IsOptional()
    @IsString()
remarks?: string;
}