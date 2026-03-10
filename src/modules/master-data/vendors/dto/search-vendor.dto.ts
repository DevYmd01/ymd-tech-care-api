import { IsOptional, IsString } from 'class-validator';

export class SearchVendorDto {

    @IsOptional()
    @IsString()
    vendor_code?: string;

    @IsOptional()
    @IsString()
    vendor_name?: string;

    @IsOptional()
    @IsString()
    vat_registration_no?: string;

}
