import { IsNotEmpty, IsString, IsInt, IsDate, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreatePOLineDTO {
    @IsNotEmpty()
    @IsNumber()
    line_no!: number;

    @IsNotEmpty()
    @IsNumber()
    item_id!: number;

    @IsOptional()
    @IsNumber()
    pr_line_id?: number;

    @IsOptional()
    @IsNumber()
    rfq_line_id?: number;

    @IsNotEmpty()
    @IsString()
    status!: string;

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
    @IsNumber()
    tax_code_id!: number;

    @IsOptional()
    @IsString()
    discount_expression?: string;

    @IsNotEmpty()
    @IsString()
    required_receipt_type!: string;

    @IsNotEmpty()
    @IsString()
    description!: string;
}