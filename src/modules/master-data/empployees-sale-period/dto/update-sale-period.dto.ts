import { IssuePolicy, TrackingLevel } from '@prisma/client';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
export class UpdateSalePeriodDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
   period_target!: number;
    @IsNotEmpty()
    @IsString()
    begin_date!: string;
    @IsOptional()
    @IsString()
    end_date?: string;
    @IsOptional()
    @IsBoolean()
    close_status?: boolean;

}