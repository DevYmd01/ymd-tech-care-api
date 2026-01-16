import {
    IsString,
    IsOptional,
    IsBoolean,
    IsNumber,
    IsEnum,
} from 'class-validator';

/// สร้างเจ้าหนี้
export class CreateVendorDto {
    @IsOptional()
    @IsString()
    vendor_code?: string;

    @IsOptional()
    @IsString()
    vendor_name?: string;

    @IsOptional()
    @IsString()
    vendor_name_en?: string;

    @IsOptional()
    @IsString()
    vendor_type?: string;

    @IsOptional()
    @IsString()
    category?: string;

    @IsOptional()
    @IsString()
    tax_id?: string;

    @IsOptional()
    @IsString()
    branch_name?: string;

    @IsOptional()
    @IsBoolean()
    is_vat_registered?: boolean;

    @IsOptional()
    @IsBoolean()
    wht_applicable?: boolean;

    @IsOptional()
    @IsNumber()
    payment_term_days?: number;

    @IsOptional()
    @IsNumber()
    credit_limit?: number;

    @IsOptional()
    @IsString()
    currency_code?: string;

    @IsOptional()
    @IsString()
    status?: string;

    @IsOptional()
    @IsString()
    contact_person?: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    email?: string;

    @IsOptional()
    @IsString()
    address?: string;

    @IsOptional()
    @IsString()
    province?: string;

    @IsOptional()
    @IsString()
    country?: string;

    @IsOptional()
    @IsString()
    remark?: string;
}


// update-vendor-status.dto.ts
/// อัปเดตสถานะเจ้าหนี้
export enum VendorStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    SUSPENDED = 'SUSPENDED',
    BLACKLISTED = 'BLACKLISTED',
}

/// อัปเดตสถานะเจ้าหนี้
export class UpdateVendorStatusDto {
    @IsEnum(VendorStatus)
    status: VendorStatus;

    @IsOptional()
    @IsString()
    remark?: string;
}

