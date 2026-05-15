import {
    IsInt,
    IsOptional,
    IsString,
    IsEnum,
    IsNumber,
    IsNotEmpty,
    IsBoolean,
} from 'class-validator';

import { Type } from 'class-transformer';
import { LotTransactionType } from '../enums/lot-balance-type.enum';

export class CreateLotTransactionDto {
    @IsNotEmpty()
    @IsInt()
    item_id!: number;

    @IsOptional()
    @IsInt()
    branch_id?: number;

    @IsNotEmpty()
    @IsInt()
    warehouse_id!: number;

    @IsOptional()
    @IsInt()
    location_id?: number;

    @IsNotEmpty()
    @IsInt()
    lot_id?: number;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber({ maxDecimalPlaces: 6 })
    qty!: number;

    @IsNotEmpty()
    @IsEnum(LotTransactionType)
    trans_type!: LotTransactionType;

    // Example:
    // SALE_ORDER
    // DELIVERY_ORDER
    // PURCHASE_RECEIVE
    // STOCK_ADJUSTMENT

    @IsOptional()
    @IsString()
    ref_doc_type?: string;

    @IsOptional()
    @IsString()
    ref_doc_no?: string;

    @IsOptional()
    @IsInt()
    ref_line_id?: number;

    @IsOptional()
    @IsString()
    remark?: string;
}