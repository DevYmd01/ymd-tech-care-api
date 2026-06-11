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


export class CreateReturnStockLineDto {

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    issue_stock_line_id!: number;

    @IsNotEmpty()
    @IsInt()
    @Type(() => Number)
    item_id!: number;

    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    qty!: number;

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
@IsNumber()
unit_cost_price!: number;
}

