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
import { CreateApprovedIssueRequisitionLineDto } from './create-appv-issue-req-line.dto';

export class CreateApprovedIssueRequisitionHeaderDto { 

@IsNotEmpty()
@IsDate()
@Type(() => Date)
appv_issue_req_date!: Date;
@IsNotEmpty()
@IsInt()
@Type(() => Number)
doc_link_ic_id!: number;
@IsNotEmpty()
@IsInt()
@Type(() => Number)
issue_req_id!: number; // This field is added to link the approved requisition to the original issue requisition. Adjust as necessary.
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
approval_emp_id!: number;

@IsNotEmpty()
@IsString()
status!: string;

@IsOptional()
stock_effect_ic?: number | null;

@IsNotEmpty()
@IsArray()
@ValidateNested({ each: true })
@Type(() => CreateApprovedIssueRequisitionLineDto)
lines!: CreateApprovedIssueRequisitionLineDto[];

}