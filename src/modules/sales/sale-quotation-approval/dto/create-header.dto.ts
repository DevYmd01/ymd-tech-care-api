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
import { CreateLineDto } from '../dto/create-line.dto';

export class CreateHeaderDto {
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    aq_date!: Date;
    @IsNotEmpty()
    @IsNumber()
    sq_id!: number;
    @IsNotEmpty()
    @IsString()
    status!: string;
    @IsOptional()
    @IsString()
    remarks?: string;
    @IsNotEmpty()
    @IsNumber()
    approval_emp_id!: number;
    @IsNotEmpty()
    @IsString()
    approval_emp_name!: string;
    @IsNotEmpty()
    @IsString()
    base_currency_code!: string;
    @IsNotEmpty()
    @IsString()
    quote_currency_code!: string;
    @IsNotEmpty()
    @IsNumber()
    exchange_rate!: number;
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    exchange_rate_date!: Date;
    @IsOptional()
    @IsNumber()
    tax_code_id?: number;
    @IsOptional()
    @IsString()
    discount_expression?: string;
    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateLineDto)
    aq_lines!: CreateLineDto[];

}