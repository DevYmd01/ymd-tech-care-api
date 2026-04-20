import { IsNotEmpty, IsString, IsInt, IsDate, IsOptional, IsBoolean, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSaleQuotationLineDto {

    @IsOptional()
    @IsNumber()
    sq_line_id?: number;

    @IsNotEmpty()
    @IsNumber()
    item_id!: number;

    @IsOptional()
    @IsString()
    note?: string;

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
    tax_code_id?: number;

    @IsOptional()
    @IsString()
    discount_expression?: string;
}