import { IsNotEmpty, IsString, IsInt, IsDate, IsOptional, IsBoolean, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePOLineDTO } from './create-po-line.dto';

export class CreatePOHeaderDTO {
    @IsNotEmpty()
    @IsInt()
    pr_id: number;

    @IsNotEmpty()
    @IsInt()
    rfq_id: number;

    @IsNotEmpty()
    @IsNumber()
    vendor_id: number;

    @IsNotEmpty()
    @IsInt()
    branch_id: number;

    @IsNotEmpty()
    @IsInt()
    warehouse_id: number;

    @IsNotEmpty()
    @IsString()
    base_currency_code: string;

    @IsNotEmpty()
    @IsString()
    quote_currency_code: string;

    @IsNotEmpty()
    @IsNumber()
    exchange_rate: number;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    exchange_rate_date: Date;

    @IsNotEmpty()
    @IsInt()
    tax_code_id: number;

    @IsOptional()
    @IsString()
    discount_expression: string;

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    created_at: Date;

    @IsNotEmpty()
    @IsInt()
    created_by: number;

    @IsNotEmpty()
    @IsInt()
    winning_vq_id: number;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePOLineDTO)
    po_lines: CreatePOLineDTO[];
}