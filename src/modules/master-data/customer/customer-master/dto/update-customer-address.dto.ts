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
    IsNotEmpty,
} from 'class-validator';

import { Type } from 'class-transformer';

export class UpdateCustomerAddressDto {

    @IsNumber()
    @IsOptional()
    customer_address_id?: number;

    @IsIn(['REGISTERED', 'CONTACT', 'BILLING', 'SHIPPING'])
    address_type!: 'REGISTERED' | 'CONTACT' | 'BILLING' | 'SHIPPING';

    @IsNotEmpty()
    @IsString()
    address!: string;

    @IsString()
    @IsOptional()
    sub_district?: string;


    @IsString()
    district!: string;

    @IsString()
    province!: string;

    @IsString()
    postal_code!: string;

    @IsNotEmpty()
    @IsString()
    country!: string;

    @IsString()
    contact_person!: string;

    @IsOptional()
    @IsString()
    phone?: string;

    @IsOptional()
    @IsString()
    phone_extension?: string;

    @IsNotEmpty()
    @IsString()
    email!: string;

        @IsOptional()
    @IsBoolean()
    is_default?: boolean;

        @IsOptional()
    @IsBoolean()
    is_active?: boolean;
}

