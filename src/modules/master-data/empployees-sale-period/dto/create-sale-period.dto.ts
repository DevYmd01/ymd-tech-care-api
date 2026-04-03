import { IssuePolicy, TrackingLevel } from '@prisma/client';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateSalePeriodDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
   period_target!: number;
    @IsNotEmpty()
    @IsString()
    begin_date!: string;
    @IsNotEmpty()
    @IsString()
    end_date!: string;
    @IsNotEmpty()
    @IsBoolean()
    close_status!: boolean;
}