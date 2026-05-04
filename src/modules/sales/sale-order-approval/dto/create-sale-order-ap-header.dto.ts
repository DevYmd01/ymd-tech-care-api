import {
    IsInt,
    IsOptional,
    IsString,
    IsDateString,
    IsArray,
    ValidateNested,
    IsNumber,
    IsDecimal,
    IsNotEmpty,
    IsDate,
    Min,
} from 'class-validator';
import { Type } from 'class-transformer';

import { CreateSaleOrderApprovalLineDto } from './create-sale-order-ap-line.dto';


export class CreateSaleOrderApprovalHeaderDto {
    @IsNotEmpty()
    @IsInt()
    so_id!: number;

  @IsInt()
    customer_id!: number;

    @IsInt()
    branch_id!: number;

    @IsString()
    status?: string;

    @IsOptional()
    @IsInt()
    ship_days?: number;

    @IsString()
    remarks?: string;

    @IsOptional()
    @IsInt()
    payment_term_days?: number;

    @IsString()
    onhold?: string;

    @IsOptional()
    @IsInt()
    emp_sale_id?: number;

    @IsInt()
    sale_area_id!: number;

    @IsInt()
    emp_dept_id!: number;

    @IsInt()
    project_id!: number;

    @IsString()
    status_remark?: string;


    @IsNotEmpty()
    @IsInt()
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
    @Type(() => Number)
    @IsNumber()
    exchange_rate!: number;

    @IsNotEmpty()
    @IsDate()
    @Type(() => Date)
    exchange_rate_date!: Date;

    @IsNotEmpty()
    @IsNumber()
    tax_code_id!: number;

    @IsOptional()
    @IsString()
    discount_expression?: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateSaleOrderApprovalLineDto)
    CreateSaleOrderApprovalLineDtos!: CreateSaleOrderApprovalLineDto[];
}