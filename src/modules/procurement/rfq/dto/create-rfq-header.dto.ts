import { IsNotEmpty, IsNumber, IsDate, IsString, IsOptional, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { CreateRFQLineDTO } from "./create-rfq-line.dto";
import { CreateSFRQVendorDTO } from "./create-rfq-vendor.dto";

export class CreateRFQHeaderDTO {

    @IsNotEmpty()
    @IsNumber()
    requested_by_user_id: number;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    rfq_date: Date;

    @IsNotEmpty()
    @IsNumber()
    pr_id: number;

    @IsNotEmpty()
    @IsNumber()
    branch_id: number;

    @IsNotEmpty()
    @IsString()
    requested_by: string

    @IsNotEmpty()
    @IsString()
    status: string

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    quotation_due_date?: Date

    @IsOptional()
    @IsString()
    rfq_base_currency_code?: string

    @IsOptional()
    @IsString()
    rfq_quote_currency_code?: string

    @IsOptional()
    @IsNumber()
    rfq_exchange_rate?: number

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    rfq_exchange_rate_date?: Date

    @IsOptional()
    @IsString()
    receive_location?: string

    @IsOptional()
    @IsString()
    payment_term_hint?: string

    @IsOptional()
    @IsString()
    incoterm?: string

    @IsOptional()
    @IsString()
    remarks?: string

    @IsOptional()
    @IsNumber()
    cost_center_id?: number

    @IsOptional()
    @IsNumber()
    project_id?: number

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateRFQLineDTO)
    rfqLines?: CreateRFQLineDTO[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSFRQVendorDTO)
    rfqVendors?: CreateSFRQVendorDTO[];

}
