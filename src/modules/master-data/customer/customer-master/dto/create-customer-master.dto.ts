import {
  IsString,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsArray,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateCustomerAddressDto } from './create-customer-address.dto';

export class CreateCustomerMasterDto {
  @IsNotEmpty()
  @IsString()
  customer_code: string;

  @IsNotEmpty()
  @IsString()
  customer_name!: string;

  @IsOptional()
  @IsString()
  customer_nameeng?: string;

  @IsOptional()
  @IsNumber()
  tax_id?: number;

    @IsOptional()
  @IsNumber()
  credit_limit?: number;

    @IsOptional()
  @IsNumber()
  payment_term_days?: number;

  @IsOptional()
  @IsBoolean()
  is_vat_registered?: boolean;

  @IsOptional()
  @IsString()
  payment_method_default?: string;

    @IsOptional()
    @IsString()
  contact_name?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  website?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;

  @IsNotEmpty()
  @IsNumber()
  customer_type_id!: number;

  @IsNotEmpty()
  @IsNumber()
  customer_group_id!: number;

  @IsOptional()
  @IsNumber()
  bill_group_id?: number;

  @IsOptional()
  @IsNumber()
  business_type_id?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCustomerAddressDto)
  addresses?: CreateCustomerAddressDto[];
}