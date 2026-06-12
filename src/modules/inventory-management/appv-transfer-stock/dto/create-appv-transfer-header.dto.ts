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
import { CreateAppvTransferLineDto } from './create-appv-transfer-line.dto';

export class CreateAppvTransferHeaderDto {
    @IsNotEmpty()
    @Type(() => Date)
    appv_transfer_date!: Date;

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
    @Type(() => CreateAppvTransferLineDto)
    lines!: CreateAppvTransferLineDto[];

}