import { IsString, IsBoolean, IsOptional } from 'class-validator';


export class CreateCompanyDto {
    @IsString()
    company_code: string;

    @IsString()
    company_name: string;

    @IsString()
    @IsOptional()
    company_nameeng?: string;

    @IsString()
    @IsOptional()
    company_address?: string;

    @IsString()
    @IsOptional()
    company_addresseng?: string;

    @IsString()
    @IsOptional()
    company_phone?: string;

    @IsString()
    @IsOptional()
    company_email?: string;

    @IsString()
    @IsOptional()
    company_fax?: string;

    @IsString()
    @IsOptional()
    company_tax_id?: string;

    @IsString()
    @IsOptional()
    company_vat_id?: string;

    @IsString()
    @IsOptional()
    company_type?: string;

    @IsString()
    @IsOptional()
    company_status?: string;

    @IsString()
    @IsOptional()
    company_logo?: string;

    @IsString()
    @IsOptional()
    company_stamp?: string;

    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}
