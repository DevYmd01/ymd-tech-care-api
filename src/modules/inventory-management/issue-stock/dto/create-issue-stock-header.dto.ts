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

import { CreateIssueStockLineDto } from './create-issue-stock-line.dto';


export class CreateIssueStockHeaderDto {
    @IsNotEmpty()
    @Type(() => Date)
    issue_stock_date!: Date;
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    branch_id!: number;
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    appv_issue_req_id!: number;
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    created_by_emp_id!: number;
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    received_by_emp_id?: number;
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
    @IsString()
    status!: string;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateIssueStockLineDto)
    lines!: CreateIssueStockLineDto[];


}