import {
    IsString,
    IsDateString,
    IsOptional,
    IsNumber,
    IsEnum,
    Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePRLineDTO {

    @IsNumber()
    @Type(() => Number)
    item_id: number;

    @IsNumber()
    @Type(() => Number)
    quantity: number;

    @IsNumber()
    @Type(() => Number)
    unit_price: number;

    @IsNumber()
    @Type(() => Number)
    total_price: number;

    @IsString()
    status: string;

    @IsString()
    remark: string;
}   