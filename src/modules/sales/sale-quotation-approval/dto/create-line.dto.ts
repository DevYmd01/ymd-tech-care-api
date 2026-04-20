import {
    IsNotEmpty,
    IsString,
    IsInt,
    IsDate,
    IsOptional,
    IsNumber,
    IsArray,
    ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLineDto {
    @IsNotEmpty()
    @IsNumber()
    sq_line_id!: number;
    @IsNotEmpty()
    @IsNumber()
    item_id!: number;
    @IsNotEmpty()
    @IsNumber()
    approved_qty!: number;
    @IsNotEmpty()
    @IsNumber()
    qty!: number;
    @IsNotEmpty()
    @IsNumber()
    uom_id!: number;
    @IsNotEmpty()
    @IsNumber()
    unit_price!: number;
    @IsOptional()
    @IsString()
    discount_expression?: string;
    @IsOptional()
    @IsString()
    remarks?: string;
}