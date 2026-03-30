import {
    IsString,
    IsDate,
    IsOptional,
    IsNumber,
    IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class createPoApprovalLineDto {
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    approved_qty: number;
    @IsOptional()
    @IsString()
    remarks?: string;
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    po_line_id: number;
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    approval_date: Date;
}