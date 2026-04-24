import {
  IsOptional,
  IsInt,
  IsString,
  IsDateString,
  MaxLength,
} from 'class-validator';

export class UpdateItemLotDto {
  @IsOptional()
  @IsString()
  @MaxLength(30)
  lot_no?: string;

  @IsOptional()
  @IsInt()
  item_id?: number;

  @IsOptional()
  @IsInt()
  supplier_vendor_id?: number;

  @IsOptional()
  @IsDateString()
  mfg_date?: string;

  @IsOptional()
  @IsDateString()
  expiry_date?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20)
  status?: string;

  @IsOptional()
  @IsString()
  note?: string;
}