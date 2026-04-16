import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CalculatePriceDto {
  // ===== INPUT =====
  @IsString()
  itemId: string;

  @Type(() => Number)
  @IsInt()
  qty: number;

  @IsOptional()
  @IsString()
  uomId?: string;

  // ===== CONTEXT =====
  @IsOptional()
  @IsString()
  customerId?: string;

  @IsOptional()
  @IsString()
  branchId?: string;

  @IsOptional()
  @IsString()
  date?: string;
}