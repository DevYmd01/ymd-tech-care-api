import {
    IsString,
    IsDate,
    IsOptional,
    IsNumber,
    Min,
    IsArray,
    ValidateNested,
    IsNotEmpty,
    IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateGrnLineDto {

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    approval_line_id?: number;
 
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    po_line_id!: number;

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    item_id!: number;

    @IsOptional()
    @IsString()
    remarks?: string;

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    qty_received!: number;

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    uom_id!: number;

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    warehouse_id!: number;

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    location_id!: number;

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    lot_id!: number;

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    lot_balance_id!: number;

    @IsNotEmpty()
    @IsString()
    status!: string;


}