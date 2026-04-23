import {
    IsNotEmpty,
    IsString,
    IsInt,
    IsDate,
    IsOptional,
    IsNumber,
    IsArray,
    ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateICOptionDto {
    @IsNotEmpty()
    @IsNumber()
    ic_option_id!: number;
    @IsNotEmpty()
    @IsNumber()
    system_document_id!: number;
    @IsOptional()
    @IsNumber()
    sort_order?: number;
    @IsOptional()
    @IsNumber()
    negative_stock_check?: number;
    @IsOptional()
    @IsNumber()
    quantity_validation_flag?: number;
    @IsOptional()
    @IsNumber()
    negative_stock_mode?: number;

}