import {
    IsString,
    IsOptional,
    IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePRLineDTO {

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
    pr_id: number;

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
    tax_code?: string;

    @IsString()
    @IsOptional()
    required_receipt_type?: string;
}   