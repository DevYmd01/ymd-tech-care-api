import {
    IsString,
    IsDateString,
    IsOptional,
    IsBoolean,
    IsNumber,
    IsEnum,
    Max,
    Min,
    IsArray,
    ValidateNested,
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

    @IsBoolean()
    is_primary: boolean;
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

/// อัปเดตสถานะเจ้าหนี้
export class UpdateVendorStatusDto {
    @IsEnum(VendorStatus)
    status: VendorStatus;

    @IsOptional()
    @IsString()
    remark?: string;
}


///สร้างบันทึกผลการประเมินเจ้าหนี้
export class CreateVendorPerformanceDto {

    /// วันที่ประเมิน
    @IsOptional()
    @IsDateString()
    evaluation_date?: string; // ISO date เช่น 2025-01-15

    /// งวดการประเมิน
    @IsOptional()
    @IsString()
    evaluation_period?: string; // เช่น 2025-Q1

    /// คะแนนคุณภาพ
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    quality_score?: number;

    /// คะแนนการส่งมอบ
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    delivery_score?: number;

    /// คะแนนราคา
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    price_score?: number;

    /// คะแนนบริการ
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    service_score?: number;

    /// คะแนนรวม
    @IsOptional()
    @IsNumber()
    @Min(0)
    @Max(100)
    total_score?: number;

    /// เกรดประเมิน
    @IsOptional()
    @IsString()
    rating?: string; // A–E

    /// หมายเหตุ
    @IsOptional()
    @IsString()
    remark?: string;

    /// ผู้ประเมิน
    @IsOptional()
    @IsString()
    evaluated_by?: string;
}





