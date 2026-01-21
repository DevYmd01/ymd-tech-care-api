import {
    IsString,
    IsOptional,
    IsBoolean,
    IsNumber,
    IsArray,
    ValidateNested,
    IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';


/// สร้างเจ้าหนี้
export class UpdateVendorDto {
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

    /// เพิ่มผู้ติดต่อ
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateVendorContactDto)
    contacts?: UpdateVendorContactDto[];

    /// เพิ่มบัญชีธนาคาร
    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateVendorBankAccountDto)
    bank_accounts?: UpdateVendorBankAccountDto[];


    @IsOptional()
    @IsString()
    status?: string;
}

/// เพิ่มผู้ติดต่อให้กับเจ้าหนี้
export class UpdateVendorContactDto {
    @IsOptional()
    @IsInt()
    contact_id: number;

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

    @IsBoolean()
    is_primary: boolean;

    @IsOptional()
    @IsBoolean()
    _delete?: boolean; // ⭐ key สำคัญ
}

/// เพิ่มบัญชีธนาคารให้กับเจ้าหนี้
export class UpdateVendorBankAccountDto {
    @IsOptional()
    @IsInt()
    bank_account_id: number;

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

    @IsOptional()
    @IsBoolean()
    _delete?: boolean; // ⭐ key สำคัญ
}
