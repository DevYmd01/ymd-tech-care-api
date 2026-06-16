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


export class CreateTransferOutLineDto {

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    appv_transfer_line_id?: number;
    
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
    qty_approved!: number;

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

