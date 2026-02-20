import { IsNotEmpty, IsNumber, IsString, IsOptional, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class CreateRFQLineDTO {

    @IsNotEmpty()
    @IsNumber()
    line_no: number;

    @IsNotEmpty()
    @IsNumber()
    pr_line_id: number;

    @IsNotEmpty()
    @IsNumber()
    item_id: number;

    @IsOptional()
    @IsString()
    description?: string;

    @IsNotEmpty()
    @IsNumber()
    qty: number;

    @IsNotEmpty()
    @IsNumber()
    uom_id: number;

    @IsOptional()
    @IsString()
    required_receipt_type?: string;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    target_delivery_date?: Date;

    @IsOptional()
    @IsString()
    note_to_vendor?: string;

}