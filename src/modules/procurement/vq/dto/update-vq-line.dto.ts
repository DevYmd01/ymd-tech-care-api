import { IsNotEmpty, IsNumber, IsDate, IsString, IsOptional, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class UpdateVQLineDTO {

    @IsOptional()
    @IsNumber()
    vq_line_id?: number;

    @IsNotEmpty()
    @IsNumber()
    line_no: number;

    @IsNotEmpty()
    @IsNumber()
    item_id: number;

    @IsOptional()
    @IsNumber()
    pr_line_id: number;

    @IsOptional()
    @IsNumber()
    approval_line_id!: number;

    @IsNotEmpty()
    @IsString()
    status: string;

    @IsNotEmpty()
    @IsNumber()
    qty: number;

    @IsNotEmpty()
    @IsNumber()
    uom_id: number;

    @IsNotEmpty()
    @IsNumber()
    unit_price: number;

    @IsOptional()
    @IsNumber()
    tax_code_id: number;

    @IsOptional()
    @IsString()
    discount_expression?: string;

}