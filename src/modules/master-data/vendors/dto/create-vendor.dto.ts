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
    tax_id?: string;

    @IsOptional()
    @IsBoolean()
    is_vat_registered?: boolean;

    @IsOptional()
    @IsNumber()
    payment_term_days?: number;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    email?: string;

    /// ที่อยู่ ข้อมูล array ของ CreateVendorAddressDto
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateVendorAddressDto)
    addresses?: CreateVendorAddressDto[]

    /// สถานะ
    @IsOptional()
    @IsBoolean()
    is_active?: boolean;

    /// FK 
    ///////////////
    /// ประเภทเจ้าหนี้
    @IsOptional()
    @IsNumber()
    vendor_type_id?: number

    /// กลุ่มเจ้าหนี้
    @IsOptional()
    @IsNumber()
    vendor_group_id?: number

    /// ค่าเงิน
    @IsOptional()
    @IsNumber()
    currency_id?: number

    /// เพิ่มผู้ติดต่อ
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateVendorContactDto)
    contacts?: CreateVendorContactDto[];

    /// เพิ่มบัญชีธนาคาร
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateVendorBankAccountDto)
    bank_accounts?: CreateVendorBankAccountDto[];


    @IsOptional()
    @IsString()
    status?: string;

}

/// เพิ่มที่อยู่ให้กับเจ้าหนี้
export class CreateVendorAddressDto {
    @IsIn(['REGISTERED', 'CONTACT', 'BILLING', 'SHIPPING'])
    address_type: 'REGISTERED' | 'CONTACT' | 'BILLING' | 'SHIPPING';

    @IsString()
    address?: string;

    @IsString()
    district: string;

    @IsString()
    province: string;

    @IsString()
    postal_code: string;

    @IsOptional()
    @IsString()
    country?: string;

    @IsString()
    contact_person: string;

    @IsString()
    phone: string;

    @IsString()
    phone_extension: string;

    @IsString()
    email: string;

    @IsBoolean()
    is_default?: boolean;

    @IsBoolean()
    is_active?: boolean;
}

/// เพิ่มผู้ติดต่อให้กับเจ้าหนี้
export class CreateVendorContactDto {
    @IsString()
    contact_name: string;

    @IsString()
    email: string;

    @IsString()
    phone: string;

    @IsString()
    position: string;

    @IsString()
    mobile?: string;

    @IsOptional()
    @IsBoolean()
    is_primary?: boolean;
}


/// เพิ่มบัญชีธนาคารให้กับเจ้าหนี้
export class CreateVendorBankAccountDto {
    @IsString()
    bank_name: string;

    @IsString()
    bank_branch: string;

    @IsString()
    account_no: string;

    @IsString()
    account_name: string;

    @IsString()
    account_type: string;

    @IsString()
    swift_code: string;

    @IsBoolean()
    is_default: boolean;
}

/// อัปเดตสถานะเจ้าหนี้
export enum VendorStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    SUSPENDED = 'SUSPENDED',
    BLACKLISTED = 'BLACKLISTED',
}
