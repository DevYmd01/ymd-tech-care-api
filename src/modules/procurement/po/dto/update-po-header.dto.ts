import { IsNotEmpty, IsString, IsInt, IsDate, IsOptional, IsBoolean, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { UpdatePOLineDTO } from './update-po-line.dto';

export class UpdatePOHeaderDTO {

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    po_date: Date;
   
    @IsOptional()
    @IsInt()
    pr_id?: number;

    @IsOptional()
    @IsInt()
    qc_id?: number;

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
    updated_by: number;


    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdatePOLineDTO)
    po_lines: UpdatePOLineDTO[];
}