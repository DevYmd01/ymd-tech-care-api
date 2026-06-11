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
import { UpdateReturnStockLineDto } from './update-return-stock-line.dto';

export class UpdateReturnStockHeaderDto { 

@IsNotEmpty()
@IsDate()
@Type(() => Date)
return_stock_date!: Date;

@IsOptional()
@IsInt()
@Type(() => Number)
issue_stock_id?: number;

@IsNotEmpty()
@IsInt()
@Type(() => Number)
doc_link_ic_id!: number;
@IsNotEmpty()
@IsInt()
@Type(() => Number)
emp_dept_id!: number;
@IsNotEmpty()
@IsInt()
@Type(() => Number)
project_id!: number;
@IsOptional()
@IsString()
remarks?: string;
@IsNotEmpty()
@IsInt()
@Type(() => Number)
branch_id!: number;
@IsNotEmpty()
@IsInt()
@Type(() => Number)
created_by_emp_id!: number;
@IsNotEmpty()
@IsInt()
@Type(() => Number)
received_by_emp_id!: number;

@IsNotEmpty()
@IsString()
status!: string;

@IsOptional()
stock_effect_ic?: number | null;

@IsOptional()
doc_type_no?: number | null; 

@IsNotEmpty()
@IsArray()
@ValidateNested({ each: true })
@Type(() => UpdateReturnStockLineDto)
lines!: UpdateReturnStockLineDto[];

}