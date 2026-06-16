import {
    IsString,
    IsDate,
    IsOptional,
    IsNumber,
    Min,
    IsArray,
    ValidateNested,
    IsNotEmpty,
    IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateGrnLineDto } from './create-grn-line.dto';

export class UpdateGrnHeaderDto {

    grn_date!: Date;
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    po_approval_id!: number;
    @IsNotEmpty()
    @IsString()
    status!: string;
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    received_by_id!: number;
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    created_by_id!: number;
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    project_id!: number;
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    emp_dept_id!: number;
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    branch_id!: number;
    @IsOptional()
    @IsString()
    remarks?: string;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateGrnLineDto)
    grn_lines!: CreateGrnLineDto[];


}