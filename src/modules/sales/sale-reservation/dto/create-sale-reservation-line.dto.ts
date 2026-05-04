import {
  IsInt,
  IsOptional,
  IsString,
  IsDateString,
  IsArray,
  ValidateNested,
  IsNumber,
  IsDecimal,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

//
// D6 LINE DTO
//
export class CreateSaleReservationLineDto {
  @IsInt()
  item_id!: number;
@IsOptional()
  @IsInt()
  warehouse_id?: number;
@IsOptional()
  @IsInt()
  location_id?: number;

  @IsOptional()
  @IsInt()
  lot_id?: number;

  @IsOptional()
  @IsString()
  note?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  qty!: number;

  @IsInt()
  uom_id!: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  unit_price!: number;

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

      @IsOptional()
  @IsNumber({ maxDecimalPlaces: 2 })
  net_amount?: number;
}