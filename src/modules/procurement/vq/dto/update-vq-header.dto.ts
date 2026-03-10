import { IsNotEmpty, IsNumber, IsDate, IsString, IsOptional, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { UpdateVQLineDTO } from "./update-vq-line.dto";

export class UpdateVQHeaderDTO {
    @IsNotEmpty()
    @IsString()
    quotation_no: string;
    @IsNotEmpty()
    @IsNumber()
    pr_id: number;
    @IsNotEmpty()
    @IsNumber()
    rfq_id: number;
    @IsNotEmpty()
    @IsNumber()
    vendor_id: number;
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    quotation_date: Date;
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    quotation_expiry_date?: Date;
    @IsOptional()
    @IsNumber()
    lead_time_days?: number;
    @IsOptional()
    @IsNumber()
    payment_term_days?: number;
    @IsOptional()
    @IsString()
    base_currency_code?: string;
    @IsOptional()
    @IsString()
    quote_currency_code?: string;
    @IsOptional()
    @IsNumber()
    exchange_rate?: number;
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    exchange_rate_date?: Date;
    @IsNumber()
    tax_code_id?: number;
    @IsOptional()
    @IsString()
    discount_expression?: string;
    @IsOptional()
    @IsNumber()
    created_by?: number;
    @IsNotEmpty()
    @ValidateNested({ each: true })

    @Type(() => UpdateVQLineDTO)
    vq_lines: UpdateVQLineDTO[];
} 