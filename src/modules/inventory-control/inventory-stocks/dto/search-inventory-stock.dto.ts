import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, IsInt, Min, IsNumber } from 'class-validator';

export class SearchPrDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 20;

  @IsOptional()
  @IsNumber()
  item_id?: string;

}