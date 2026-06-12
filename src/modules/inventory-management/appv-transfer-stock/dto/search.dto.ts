import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';

export class SearchTransferDto {
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
  appv_transfer_no?: string;

  @IsOptional()
  @IsString()
  transfer_req_no?: string;

  @IsOptional()
  @Type(() => Date)
  date_from?: Date;
  @IsOptional()
  @Type(() => Date)
  date_to?: Date;


  @IsOptional()
  @Type(() => Number)
  transfer_req_id?: number;



}