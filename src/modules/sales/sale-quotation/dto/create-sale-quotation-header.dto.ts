import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsDate,
  IsOptional,
  IsNumber,
  IsArray,
  ValidateNested
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateSaleQuotationLineDto } from './create-sale-quotation-line.dto';

export class CreateSaleQuotationHeaderDto {
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  sq_date!: Date;

  @IsOptional()
  @IsNumber()
  lead_id?: number;

  @IsOptional()
  @IsNumber()
  customer_id?: number;

  @IsOptional()
  @IsNumber()
  branch_id?: number;

  @IsNotEmpty()
  @IsString()
  status!: string;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  valid_until?: Date;

  @IsOptional()
  @IsString()
  remarks?: string;

  @IsNotEmpty()
  @IsNumber()
  payment_term_days!: number;

  @IsNotEmpty()
  @IsString()
  onhold!: string;

  @IsOptional()
  @IsInt()
  emp_sale_id?: number;

  
  @IsOptional()
  @IsInt()
  sale_area_id?: number;

  @IsNotEmpty()
  @IsInt()
  emp_dept_id!: number;

  @IsNotEmpty()
  @IsInt()
  project_id!: number;

  @IsNotEmpty()
  @IsString()
  sq_status!: string;

  @IsNotEmpty()
  @IsString()
  base_currency_code!: string;

  @IsNotEmpty()
  @IsString()
  quote_currency_code!: string;

  @IsNotEmpty()
  @IsNumber()
  exchange_rate!: number;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  exchange_rate_date!: Date;

  @IsNotEmpty()
  @IsNumber()
  tax_code_id!: number;

  @IsOptional()
  @IsString()
  discount_expression?: string;

  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSaleQuotationLineDto)
  sq_lines!: CreateSaleQuotationLineDto[];
}