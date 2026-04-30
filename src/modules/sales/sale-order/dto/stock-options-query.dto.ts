import { Type } from 'class-transformer';
import {
    IsOptional,
    IsInt,
    Min,
    IsNumber,
} from 'class-validator';

export class StockOptionQueryDto {
    // ===============================
    // Pagination
    // ===============================
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 20;

    // ===============================
    // Filter
    // ===============================

    // รหัสสินค้า
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    item_id?: number;

    // สาขา
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    branch_id?: number;

    // คลัง
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    warehouse_id?: number;

    // ที่เก็บ
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    location_id?: number;

    // จำนวนที่ต้องการใช้
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    qty?: number;
}