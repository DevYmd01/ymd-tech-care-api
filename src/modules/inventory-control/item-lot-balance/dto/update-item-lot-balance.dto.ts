import {
  IsInt,
  IsOptional,
  IsString,
  IsDateString,
  MaxLength,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';

export class UpdateItemLotBalanceDto {
@IsNotEmpty()
@IsNumber()
lot_id!: number;
@IsNotEmpty()
@IsNumber()
item_id!: number;
@IsOptional()
@IsNumber()
supplier_vendor_id?: number;
@IsOptional()
@IsNumber()
branch_id?: number;
@IsNotEmpty()
@IsNumber()
warehouse_id!: number;
@IsNotEmpty()
@IsNumber()
location_id!: number;
@IsOptional()
@IsNumber()
qty_on_hand?: number;
@IsOptional()
@IsNumber()
qty_reserved?: number;
@IsOptional()
@IsNumber()
qty_available?: number;

}