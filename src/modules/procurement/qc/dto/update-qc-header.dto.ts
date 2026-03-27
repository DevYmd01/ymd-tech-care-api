import { IsNotEmpty, IsString, IsNumber, IsDate, IsOptional, IsEnum } from 'class-validator';
import { Decimal } from '@prisma/client/runtime/library';

export class UpdateQcHeaderDTO {

    @IsNotEmpty()
    @IsNumber()
    rfq_id!: number;

    @IsNotEmpty()
    @IsNumber()
    pr_id!: number;

    @IsNotEmpty()
    @IsNumber()
    department_id!: number;

    @IsNotEmpty()
    @IsNumber()
    created_by!: number;

    @IsNotEmpty()
    @IsNumber()
    winning_vq_id!: number;

    @IsOptional()
    @IsString()
    remark?: string;
}