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
import { CreateIssueRequistionLineDto } from './create-issue-requistion-line.dto';

export class CreateIssueRequistionHeaderDto { 

@IsNotEmpty()
@IsDate()
@Type(() => Date)
issue_req_date!: Date;
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
request_by_emp_id!: number;
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
@Type(() => CreateIssueRequistionLineDto)
lines!: CreateIssueRequistionLineDto[];

}