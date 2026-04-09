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
    IsDate,
    IsNotEmpty,
} from 'class-validator';

import { Type } from 'class-transformer';
export class UpdatePriceListLineDto {
    @IsOptional()
    @IsNumber()
    price_list_item_id?: number;
    @IsOptional()
    @IsString()
    remarks?: string;
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    item_id!: number;
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    item_brand_id!: number;
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    uom_id!: number;
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    tax_code_id?: number;
    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    unit_price!: number;
    @IsNotEmpty()
    @Type(() => String)
    @IsString()
    line_discount_rate!: string;
    @IsOptional()
    @Type(() => String)
    @IsString()
    editflag?: string;
}
