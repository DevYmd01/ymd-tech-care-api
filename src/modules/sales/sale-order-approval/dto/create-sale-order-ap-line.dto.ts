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

export class CreateSaleOrderApprovalLineDto {

    @IsNotEmpty()
    @IsInt()
    so_line_id!: number;

    @IsNotEmpty()
    @IsInt()
    item_id!: number;

    @IsNotEmpty()
    @IsNumber()
    approved_qty!: number;

    @IsNotEmpty()
    @IsNumber()
    qty!: number;

    @IsNotEmpty()
    @IsInt()
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
