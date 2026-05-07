import {
    IsInt,
    IsOptional,
    IsString,
    IsDateString,
    IsArray,
    ValidateNested,
    IsNumber,
    IsDecimal,
    IsNotEmpty,
    IsDate,
    Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ArrayMinSize } from 'class-validator';

export class CreateDeliveryLineDto {
    @IsInt()
    @IsNotEmpty()
    so_line_id!: number;
    @IsInt()
    @IsNotEmpty()
    item_id!: number;
    @IsDecimal()
    @IsNotEmpty()
    qty_shipped!: number;
    @IsInt()
    @IsNotEmpty()
    uom_id!: number;
    @IsInt()
    @IsNotEmpty()
    warehouse_id!: number;
    @IsInt()
    @IsOptional()
    location_id?: number;
    @IsInt()
    @IsOptional()
    lot_id?: number;
    @IsString()
    @IsOptional()
    remarks?: string;
    @IsString()
    @IsOptional()
    serial_no?: string;
}

export class UpdateDeliveryLineDto {
    @IsInt()
    @IsOptional()
    delivery_line_id?: number;
    @IsInt()
    @IsNotEmpty()
    so_line_id!: number;
    @IsInt()
    @IsNotEmpty()
    item_id!: number;
    @IsDecimal()
    @IsNotEmpty()
    qty_shipped!: number;
    @IsInt()
    @IsNotEmpty()
    uom_id!: number;
    @IsInt()
    @IsNotEmpty()
    warehouse_id!: number;
    @IsInt()
    @IsOptional()
    location_id?: number;
    @IsInt()
    @IsOptional()
    lot_id?: number;
    @IsString()
    @IsOptional()
    remarks?: string;
    @IsString()
    @IsOptional()
    serial_no?: string;
}