import {
    IsString,
    IsDateString,
    IsOptional,
    IsNumber,
    Min,
    IsArray,
    ValidateNested,
    IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UpdateTransferLineDto } from './update-transfer-req-line.dto';

export class UpdateTransferHeaderDto {
    @IsNotEmpty()
    @Type(() => Date)
    transfer_req_date!: Date;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    from_branch_id!: number;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    branch_id!: number;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    doc_link_ic_id!: number;


    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    created_by_emp_id!: number;

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    transfer_by_emp_id?: number;

    @IsOptional()
    @IsString()
    remarks?: string;

    @IsNotEmpty()
    @IsString()
    status!: string;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateTransferLineDto)
    lines!: UpdateTransferLineDto[];

}