import {
    IsString,
    IsDateString,
    IsOptional,
    IsNumber,
    Min,
    IsArray,
    ValidateNested,
    IsNotEmpty,
    IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateTransferLineDto {

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    transfer_req_line_id?: number;
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    item_id!: number;
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    qty!: number;
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    uom_id!: number;
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    from_warehouse_id!: number;
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    from_location_id!: number;
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    to_warehouse_id!: number;
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    to_location_id!: number;
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    lot_id!: number;
    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    lot_balance_id!: number;
    @IsOptional()
    @IsString()
    remarks?: string;
}


