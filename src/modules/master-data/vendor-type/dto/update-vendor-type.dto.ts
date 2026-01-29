import {
    IsString,
    IsDateString,
    IsOptional,
    IsNumber,
    IsEnum,
    Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateVendorTypeDTO {
    @IsString()
    @IsOptional()
    vendor_type_code: string;
    @IsString()
    vendor_type_name: string;
    @IsString()
    vendor_type_nameeng: string;
    @IsString()
    @IsOptional()
    description: string;
    @IsString()
    @IsOptional()
    status: string;
}