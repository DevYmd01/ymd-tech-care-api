import {
    IsString,
    IsOptional,
    IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVendorTypeDTO {
    @IsString()
    @IsOptional()
    vendor_type_code: string;
    @IsString()
    @IsNotEmpty()
    vendor_type_name: string;
    @IsString()
    @IsOptional()
    vendor_type_nameeng: string;
    @IsNotEmpty()
    is_active?: boolean;
}