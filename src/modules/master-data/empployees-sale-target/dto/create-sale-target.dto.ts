import { IssuePolicy, TrackingLevel } from '@prisma/client';
import { IsBoolean, IsEnum, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
export class CreateSaleTargetDto {
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    saletarget_code: string;

    @IsNotEmpty()
    @IsString()
    @MaxLength(255)
    saletarget_name: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    saletarget_nameeng?: string;


    @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}