import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class SearchPendingDto {
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
      @IsString()
      status?: string;

  @IsOptional()
  @IsString()
  issue_stock_no?: string;

  @IsOptional()
  @Type(() => Number)
  issue_stock_id?: number;

  

}