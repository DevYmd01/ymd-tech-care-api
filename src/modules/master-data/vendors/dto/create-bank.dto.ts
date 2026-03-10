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
