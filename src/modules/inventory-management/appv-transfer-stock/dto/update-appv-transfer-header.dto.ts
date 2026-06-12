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
import { UpdateAppvTransferLineDto } from './update-appv-transfer-line.dto';

export class UpdateAppvTransferHeaderDto {
    @IsNotEmpty()
    @Type(() => Date)
    appv_transfer_date!: Date;

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    transfer_req_id!: number;


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
    approval_emp_id!: number;

    @IsOptional()
    @IsString()
    remarks?: string;

    @IsNotEmpty()
    @IsString()
    status!: string;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateAppvTransferLineDto)
    lines!: UpdateAppvTransferLineDto[];

}