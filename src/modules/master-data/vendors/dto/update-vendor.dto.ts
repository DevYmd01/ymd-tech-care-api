import {
    IsString,        // ตรวจว่าเป็น string
    IsDateString,    // ตรวจว่าเป็นวันที่ในรูปแบบ ISO (เช่น 2026-01-22)
    IsOptional,      // ฟิลด์นี้ไม่จำเป็น (ส่งมาก็ได้ ไม่ส่งก็ไม่ error)
    IsBoolean,       // ตรวจว่าเป็น true / false
    IsNumber,        // ตรวจว่าเป็นตัวเลข
    IsEnum,          // ตรวจว่าเป็นค่าที่อยู่ใน enum ที่กำหนด
    Max,             // กำหนดค่าสูงสุดของตัวเลข
    Min,             // กำหนดค่าต่ำสุดของตัวเลข
    IsArray,         // ตรวจว่าเป็น array
    ValidateNested,  // ใช้ตรวจ object ซ้อน (เช่น array ของ DTO)
    IsIn,
} from 'class-validator';

import { Type } from 'class-transformer';

export class UpdateVendorDto {
    @IsString()
    @IsOptional()
    vendor_code?: string;

    @IsString()
    @IsOptional()
    vendor_name?: string;

    @IsString()
    @IsOptional()
    vat_registration_no?: string;

    @IsBoolean()
    @IsOptional()
    is_vat_registered?: boolean;

    @IsBoolean()
    @IsOptional()
    is_subject_to_wht?: boolean;

    @IsNumber()
    @IsOptional()
    payment_term_days?: number;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsBoolean()
    @IsOptional()
    is_active?: boolean;

    @IsNumber()
    @IsOptional()
    vendor_type_id?: number;

    @IsNumber()
    @IsOptional()
    vendor_group_id?: number;

    @IsNumber()
    @IsOptional()
    currency_id?: number;

    @Type(() => UpdateVendorAddressDto)
    @ValidateNested()
    @IsArray()
    addresses?: UpdateVendorAddressDto[];

    @Type(() => UpdateVendorContactDto)
    @ValidateNested()
    @IsArray()
    contacts?: UpdateVendorContactDto[];

    @Type(() => UpdateVendorBankAccountDto)
    @ValidateNested()
    @IsArray()
    bank_accounts?: UpdateVendorBankAccountDto[];
}

export class UpdateVendorAddressDto {
    @IsNumber()
    @IsOptional()
    vendor_address_id?: number;

    @IsIn(['REGISTERED', 'CONTACT', 'BILLING', 'SHIPPING'])
    address_type: 'REGISTERED' | 'CONTACT' | 'BILLING' | 'SHIPPING';

    @IsString()
    @IsOptional()
    address?: string;

    @IsString()
    @IsOptional()
    district?: string;

    @IsString()
    @IsOptional()
    province?: string;

    @IsString()
    @IsOptional()
    postal_code?: string;

    @IsString()
    @IsOptional()
    country?: string;

    @IsString()
    @IsOptional()
    contact_person?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    phone_extension?: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsBoolean()
    @IsOptional()
    is_default?: boolean;

    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}

export class UpdateVendorContactDto {
    @IsNumber()
    @IsOptional()
    contact_id?: number;

    @IsString()
    @IsOptional()
    contact_name?: string;

    @IsString()
    @IsOptional()
    position?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    mobile?: string;

    @IsString()
    @IsOptional()
    email?: string;

    @IsBoolean()
    @IsOptional()
    is_primary?: boolean;
}

export class UpdateVendorBankAccountDto {
    @IsNumber()
    @IsOptional()
    bank_account_id?: number;

    @IsString()
    @IsOptional()
    bank_name?: string;

    @IsString()
    @IsOptional()
    bank_branch?: string;

    @IsString()
    @IsOptional()
    account_no?: string;

    @IsString()
    @IsOptional()
    account_name?: string;

    @IsString()
    @IsOptional()
    account_type?: string;

    @IsString()
    @IsOptional()
    swift_code?: string;

    @IsBoolean()
    @IsOptional()
    is_default?: boolean;

    @IsBoolean()
    @IsOptional()
    is_active?: boolean;
}
