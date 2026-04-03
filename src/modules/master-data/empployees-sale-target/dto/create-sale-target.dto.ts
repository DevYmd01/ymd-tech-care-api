import { IssuePolicy, TrackingLevel } from '@prisma/client';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateSaleTargetDto {

    @IsNotEmpty()
    @IsInt()
    list_no: number;

    @IsNotEmpty()
    @IsInt()
    emp_id: number;

    @IsNotEmpty()
    @IsInt()
    period_id: number;

    @IsNotEmpty()
    @IsNumber()
    period_target: number;
}