import {
    IsNumber,
    IsOptional,
    IsString,
    IsDateString,
    IsArray,
    ValidateNested,
    IsDecimal,
    Min,
    IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

//
// D6 LINE DTO
//

export class CreateSaleOrderLineDto {

    @IsNumber()
    so_id: number;

    @IsNumber()
    reservation_line_id: number;

    @IsNumber()
    item_id: number;

    @IsNumber()
    warehouse_id: number;

    @IsNumber()
    location_id: number;

    @IsOptional()
    @IsNumber()
    lot_id?: number;

    @IsOptional()
    @IsString()
    note?: string;

    @IsNumber({ maxDecimalPlaces: 2 })
    qty: number;

    @IsNumber()
    @IsNotEmpty()
    uom_id!: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    unit_price: number;

    // LINE DISCOUNT
    @IsOptional()
    @IsString()
    discount_expression?: string;

    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 4 })
    discount_rate?: number;

    @IsOptional()
    @IsNumber({ maxDecimalPlaces: 2 })
    discount_amount?: number;

    @IsNumber({ maxDecimalPlaces: 2 })
    net_amount: number;
}