import {
  IsInt,
  IsOptional,
  IsString,
  IsDateString,
  MaxLength,
} from 'class-validator';

export class CreateItemLotDto {
  @IsString()
  @MaxLength(30)
  lot_no: string;

  @IsInt()
  item_id: number;

  @IsOptional()
  @IsInt()
  supplier_vendor_id?: number;

  @IsOptional()
  @IsDateString()
  mfg_date?: string;

  @IsOptional()
  @IsDateString()
  expiry_date?: string;

  @IsString()
  @MaxLength(20)
  status: string;

  @IsOptional()
  @IsString()
  note?: string;
}