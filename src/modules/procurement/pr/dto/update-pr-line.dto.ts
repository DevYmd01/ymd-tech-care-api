import {
    IsString,
    IsOptional,
    IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdatePRLineDTO {
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    pr_line_id: number;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    line_no?: number;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    item_id?: number;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    warehouse_id?: number;

    @IsString()
    @IsOptional()
    location?: string;

    @IsNumber()
    @Type(() => Number)
    qty: number;

    @IsNumber()
    @Type(() => Number)
    uom_id: number;

    @IsNumber()
    @Type(() => Number)
    est_unit_price: number;


    @IsString()
    @IsOptional()
    required_receipt_type?: string;

    @IsString()
    @IsOptional()
    @Type(() => String)
    line_discount_raw?: string;
}   