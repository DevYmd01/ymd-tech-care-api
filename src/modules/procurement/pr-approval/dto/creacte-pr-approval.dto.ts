import {
    IsString,
    IsDate,
    IsOptional,
    IsNumber,
    Min,
    IsArray,
    ValidateNested,
    IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { createPrApprovalLineDto } from './create-pr-approval-line.dto';


export class createPrApprovalDto {
    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    approval_date: Date;
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    need_by_date?: Date;
    @IsNotEmpty()
    @IsString()
    status!: string;
    @IsOptional()
    @IsString()
    remarks?: string;
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    approval_emp_id!: number;
    @IsNotEmpty()
    @IsString()
    approval_emp_name!: string;
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    pr_id!: number;
    @IsOptional()
    @IsString()
    base_currency_code: string;
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    base_currency_id?: number;
    @IsOptional()
    @IsString()
    quote_currency_code?: string;
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    quote_currency_id?: number;
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    exchange_rate?: number;
    @IsOptional()
    @IsDate()
    @Type(() => Date)
    exchange_rate_date?: Date;
    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    tax_code_id?: number;
    @IsOptional()
    @IsString()
    discount_expression?: string;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => createPrApprovalLineDto)
    pr_approval_lines: createPrApprovalLineDto[];

}